const { MicroprocessDefinition } = include('models');
const { dateToString, stringToDate } = include('util');
const NomenclatorService = require('./nomenclators');
const StaticalVariableService = require('./staticalVariable');
const DictionaryTypeService = require('./dictionaryType');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const find = require('lodash/find');
const toUpper = require('lodash/toUpper');

class MicroprocessDefinitionService {
    static async fetch({page, search}) {
        const orderBy = [{column: 'ID_MICROPROCESO', order: 'asc'}];
        const filterBy = {};
        const columnsToSelect = MicroprocessDefinition.selectableProps;
        let microprocesses=[];
        if(page && search) {
            microprocesses = await MicroprocessDefinition.findByMatch(
                page,
                search,
                ['DESCRIPCION'],
                filterBy,
                orderBy
            );
        } else if(page){
            microprocesses = await MicroprocessDefinition.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            microprocesses = await MicroprocessDefinition.find();
        }

        microprocesses = microprocesses.map(microprocess => MicroprocessDefinitionService.rebaseFormat(microprocess));

        await MicroprocessDefinitionService.getLevelData(microprocesses);
        await StaticalVariableService.getVariableData(microprocesses);
        await DictionaryTypeService.getDictionaryTypeData(microprocesses, 'dictionaryTypeId');
        return microprocesses;
    }

    static async findOne({id}){
        const ids = {ID_MICROPROCESO: toUpper(id)};
        const microprocess = await MicroprocessDefinition.findById(ids);
        return microprocess ? MicroprocessDefinitionService.rebaseFormat(microprocess) : {};
    }

    static async create(params, userCreator){
        const formattedMicroprocess = MicroprocessDefinitionService.formatData({
            ...params,
            userCreator,
            userDeleted: null,
            createdAt: new Date(),
            deletedAt: null
        });
        const returnData = ['ID_MICROPROCESO'];
        const id = await MicroprocessDefinition.insertOne(formattedMicroprocess, returnData);
        return await MicroprocessDefinitionService.findOne({id});
    }

    static async update({id}, params) {
        const formattedMicroprocess = MicroprocessDefinitionService.formatData({...params});
        const ids = {ID_MICROPROCESO: id};
        const returnData = ['ID_MICROPROCESO'];
        const createdId = await MicroprocessDefinition.updateOne(ids, formattedMicroprocess, returnData);
        return MicroprocessDefinitionService.findOne({id: createdId});
    }

    static async delete({id}){
        const ids = {ID_MICROPROCESO: id};
        const success = await MicroprocessDefinition.delete(ids);
        return !!success;
    }

    static async getTotal(){
        const result = await MicroprocessDefinition.countTotal({FECHA_BAJA: null});
        return result.total;
    }

    static rebaseFormat(microprocess) {
        return {
            id: microprocess.ID_MICROPROCESO,
            variableId: microprocess.ID_VARIABLE,
            order: microprocess.ORDEN,
            description: microprocess.DESCRIPCION,
            observation: microprocess.OBSERVACION,
            domain: microprocess.DOMINIO,
            dictionaryTypeId: microprocess.ID_TIPOLOGIA_DE_DICCIONARIO,
            nomenclatorId: microprocess.ID_NOMENCLADOR,
            amountOfDigits: microprocess.ID_CANTIDAD_DIGITOS,
            isFullyCharged: !!microprocess.CARGADO_COMPLETO_SI_NO,
            approved: !!microprocess.SUPERVISADO,
            createdAt: dateToString(microprocess.FECHA_ALTA),
            userCreator: microprocess.ID_USUARIO_ALTA,
            userDeleted: microprocess.ID_USUARIO_BAJA,
            deletedAt: dateToString(microprocess.FECHA_BAJA)
        };
    }

    static formatData(microprocess) {
        return {
            ID_MICROPROCESO: toUpper(microprocess.id),
            ID_VARIABLE: microprocess.variableId,
            ORDEN: microprocess.order,
            DESCRIPCION: toUpper(microprocess.description),
            OBSERVACION: microprocess.observation,
            DOMINIO: microprocess.domain,
            ID_TIPOLOGIA_DE_DICCIONARIO: microprocess.dictionaryTypeId,
            ID_NOMENCLADOR: microprocess.nomenclatorId,
            ID_CANTIDAD_DIGITOS: microprocess.amountOfDigits,
            CARGADO_COMPLETO_SI_NO: !!microprocess.isFullyCharged,
            SUPERVISADO: microprocess.approved,
            ID_USUARIO_ALTA: microprocess.userCreator,
            FECHA_ALTA: stringToDate(microprocess.createdAt),
            ID_USUARIO_BAJA: microprocess.userDeleted,
            FECHA_BAJA: stringToDate(microprocess.deletedAt)
        };
    }

    static async getLevelData(resources){
        const ids = uniq(map(resources, resource => [resource.nomenclatorId, resource.amountOfDigits]));
        let levels = await MicroprocessDefinition.knex.select('*')
            .from('NIVELES')
            .whereIn(['ID_NOMENCLADOR', 'ID_CANTIDAD_DIGITOS'], ids);
        levels = map(levels, level => ({
            nomenclatorId: level.ID_NOMENCLADOR,
            amountOfDigits: level.ID_CANTIDAD_DIGITOS,
            description: level.DESCRIPCION
        }));
        await NomenclatorService.getNomenclatorData(levels);
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            const {
                amountOfDigits: amountOfDigitsR,
                nomenclatorId: nomenclatorIdR
            } = resource;
            const findLevel = level => {
                const {
                    amountOfDigits: amountOfDigitsL,
                    nomenclatorId: nomenclatorIdL
                } = level;
                return amountOfDigitsR === amountOfDigitsL && nomenclatorIdR === nomenclatorIdL;
            };
            resource.foreignData.level = find(levels, findLevel);
            return resource;
        });
    }

    static async getMicroprocessesData(resources, key='microprocessId'){
        const microprocessesIds = uniq(map(resources, resource => resource[key]));
        let microprocessesData = await MicroprocessDefinition.findByValues('ID_MICROPROCESO', microprocessesIds);
        microprocessesData = map(microprocessesData, microprocess => ({
            id: microprocess.ID_MICROPROCESO,
            description: microprocess.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.microprocess = find(
                microprocessesData, microprocess => microprocess.id === resource[key]);
            return resource;
        });
    }
    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = MicroprocessDefinition.knex.select(columns)
                .from(MicroprocessDefinition.tableName)
                .where({FECHA_BAJA: null})
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function (data) {
                const formattedData = map(data, function(value) {
                    if(isDate(value)) {
                        return dateToString(value);
                    }
                    return value;
                });
                worksheet.addRow(formattedData);
            });
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }
    static getColumns(){
        return [
            {
                original: 'ID_MICROPROCESO',
                modified: 'MICROPROCESO ID'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'VARIABLE ID'
            },
            {
                original: 'ORDEN',
                modified: 'ORDEN'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                modified: 'TIPOLOGÍA DE DICCIONARIO ID'
            },
            {
                original: 'ID_NOMENCLADOR',
                modified: 'NOMENCLADOR ID'
            },
            {
                original: 'ID_CANTIDAD_DIGITOS',
                modified: 'CANTIDAD DE DÍGITOS ID'
            },
            {
                original: 'CARGADO_COMPLETO_SI_NO',
                modified: 'CARGADO COMPLETO SI/NO'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = MicroprocessDefinitionService;
