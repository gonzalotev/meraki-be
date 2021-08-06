const { MicroprocessDefinition } = include('models');
const { dateToString, stringToDate } = include('util');
const NomenclatorService = require('./nomenclators');
const StaticalVariableService = require('./staticalVariable');
const DictionaryTypeService = require('./dictionaryType');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const toUpper = require('lodash/toUpper');

class MicroprocessDefinitionService {
    static async fetch({page}) {
        let microprocesses=[];
        if(page){
            microprocesses = await MicroprocessDefinition.findByPage(
                page,
                {FECHA_BAJA: null},
                MicroprocessDefinition.selectableProps,
                [{column: 'ID_MICROPROCESO', order: 'asc'}]
            );
        } else {
            microprocesses = await MicroprocessDefinition.find({FECHA_BAJA: null});
        }
        microprocesses = microprocesses.map(microprocess => MicroprocessDefinitionService.rebaseFormat(microprocess));
        await MicroprocessDefinitionService.getLevelData(microprocesses);
        await StaticalVariableService.getVariableData(microprocesses);
        await DictionaryTypeService.getDictionaryTypeData(microprocesses, 'dictionaryTypeId');
        return microprocesses;
    }

    static async findOne({id}){
        const ids = {ID_MICROPROCESO: id};
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

    static async delete({id}, userDeleted){
        const ids = {ID_MICROPROCESO: id};
        const success = await MicroprocessDefinition.deleteOne(ids, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
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
            ID_MICROPROCESO: microprocess.id,
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
            .from('NIVEL')
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
}

module.exports = MicroprocessDefinitionService;
