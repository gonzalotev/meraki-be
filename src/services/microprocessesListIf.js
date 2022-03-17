const { microprocessesListIf: microprocessesListIfModel } = include('models');
const { dateToString, stringToDate } = include('util');
const StaticalVariableService = require('./staticalVariable');
const DictionaryTypeService = require('./dictionaryType');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const toUpper = require('lodash/toUpper');

class microprocessesListIfService {
    static async fetch({page, search}) {
        const orderBy = [{column: 'ID_LISTAS', order: 'asc'}];
        const filterBy = {};
        const columnsToSelect = microprocessesListIfModel.selectableProps;
        let microprocessesListIfTypes=[];
        if(page && search) {
            microprocessesListIfTypes = await microprocessesListIfModel.findByMatch(
                page,
                search,
                ['DESCRIPCION'],
                filterBy,
                orderBy
            );
        } else if(page){
            microprocessesListIfTypes = await microprocessesListIfModel.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            microprocessesListIfTypes = await microprocessesListIfModel.find();
        }

        microprocessesListIfTypes = microprocessesListIfTypes.map(microprocessesListIf => ({
            id: microprocessesListIf.ID_LISTAS,
            variableId: microprocessesListIf.ID_VARIABLE,
            description: microprocessesListIf.DESCRIPCION,
            diccionaryTypologyId: microprocessesListIf.ID_TIPOLOGIA_DE_DICCIONARIO,
            observation: microprocessesListIf.OBSERVACION,
            domain: microprocessesListIf.DOMINIO,
            approved: microprocessesListIf.SUPERVISADO,
            userCreator: microprocessesListIf.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesListIf.FECHA_ALTA)
        }));
        await StaticalVariableService.getVariableData(microprocessesListIfTypes);
        await DictionaryTypeService.getDictionaryTypeData(microprocessesListIfTypes, 'diccionaryTypologyId');
        return microprocessesListIfTypes;
    }

    static async getTotal({ microprocesses }) {
        let result;
        if (microprocesses) {
            result = await microprocessesListIfModel.countTotal({ ID_LISTAS: microprocesses });
        } else {
            result = await microprocessesListIfModel.countTotal();
        }
        return result.total;
    }

    static async create(params, userCreator) {
        const formattedmicroprocessesListIf = {
            ID_LISTAS: null,
            ID_VARIABLE: params.variableId,
            DESCRIPCION: toUpper(trim(params.description)),
            ID_TIPOLOGIA_DE_DICCIONARIO: params.diccionaryTypologyId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const microprocessesListIfId = await microprocessesListIfModel.insertOne(formattedmicroprocessesListIf, ['ID_LISTAS']);
        const microprocessesListIf = await microprocessesListIfService.findOne({id: microprocessesListIfId});
        return microprocessesListIf;

    }

    static async findOne(filters) {
        const microprocessesListIf = await microprocessesListIfModel.findById({
            ID_LISTAS: filters.id
        });
        return {
            id: microprocessesListIf.ID_LISTAS,
            variableId: microprocessesListIf.ID_VARIABLE,
            description: microprocessesListIf.DESCRIPCION,
            diccionaryTypologyId: microprocessesListIf.ID_TIPOLOGIA_DE_DICCIONARIO,
            observation: microprocessesListIf.OBSERVACION,
            domain: microprocessesListIf.DOMINIO,
            approved: !!microprocessesListIf.SUPERVISADO,
            userCreator: microprocessesListIf.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesListIf.FECHA_ALTA)
        };
    }

    static async update(filters, params) {
        const formattedmicroprocessesListIf = {
            ID_LISTAS: params.id,
            ID_VARIABLE: params.variableId,
            DESCRIPCION: toUpper(trim(params.description)),
            ID_TIPOLOGIA_DE_DICCIONARIO: params.diccionaryTypologyId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const microprocessesListIfId = await microprocessesListIfModel.updateOne({ ID_LISTAS: filters.id },
            formattedmicroprocessesListIf, ['ID_LISTAS']);
        const microprocessesListIf = await microprocessesListIfService.findOne({id: microprocessesListIfId});
        return microprocessesListIf;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = microprocessesListIfModel.knex.select(columns)
                .from(microprocessesListIfModel.tableName)
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

    static getColumns() {
        return [
            {
                original: 'ID_LISTAS',
                modified: 'LISTAS ID'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'VARIABLE ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                modified: 'TIPOLOGÍA DE DICCIONARIO ID'
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
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = microprocessesListIfService;
