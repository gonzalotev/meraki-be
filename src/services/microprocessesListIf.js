const { microprocessesListIf: microprocessesListIfModel } = include('models');
const { dateToString, arrayToCsvFormat } = include('util');
const map = require('lodash/map');
const trim = require('lodash/trim');

class microprocessesListIfService {
    static async fetch(query, userId) {
        const microprocessesListIfTypes = await microprocessesListIfModel.findByPage(
            query.page,
            {ID_LISTAS: userId},
            microprocessesListIfModel.selectableProps,
            [{ column: 'ID_LISTAS', order: 'asc' }]
        );
        return microprocessesListIfTypes.map(microprocessesListIf => ({
            id: microprocessesListIf.ID_LISTAS,
            variableId: microprocessesListIf.ID_VARIABLE,
            description: microprocessesListIf.DESCRIPCION,
            diccionaryTypologyId: microprocessesListIf.ID_TIPOLOGÍA_DE_DICCIONARIO,
            observation: microprocessesListIf.OBSERVACION,
            domain: microprocessesListIf.DOMINIO,
            approved: microprocessesListIf.SUPERVISADO,
            userCreator: microprocessesListIf.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesListIf.FECHA_ALTA)
        }));
    }
    static async getTotal(filters) {
        const total = await microprocessesListIfModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async create(params, userCreator) {
        const formattedmicroprocessesListIf = {
            ID_LISTAS: null,
            ID_VARIABLE: null,
            DESCRIPCION: trim(params.description),
            ID_TIPOLOGÍA_DE_DICCIONARIO: null,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: false,
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
            diccionaryTypologyId: microprocessesListIf.ID_TIPOLOGÍA_DE_DICCIONARIO,
            observation: microprocessesListIf.OBSERVACION,
            domain: microprocessesListIf.OBSERVACION,
            approved: microprocessesListIf.SUPERVISADO,
            userCreator: microprocessesListIf.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesListIf.FECHA_ALTA)
        };
    }

    static async update(filters, params, userCreator) {
        const formattedmicroprocessesListIf = {
            ID_LISTAS: null,
            ID_VARIABLE: null,
            DESCRIPCION: trim(params.description),
            ID_TIPOLOGÍA_DE_DICCIONARIO: null,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: false,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const microprocessesListIf = await microprocessesListIfModel.updateOne(
            { ID_LISTAS: filters.id },
            formattedmicroprocessesListIf
        );
        return {
            id: microprocessesListIf.ID_LISTAS,
            variableId: microprocessesListIf.ID_VARIABLE,
            description: microprocessesListIf.DESCRIPCION,
            diccionaryTypologyId: microprocessesListIf.ID_TIPOLOGÍA_DE_DICCIONARIO,
            observation: microprocessesListIf.OBSERVACION,
            domain: microprocessesListIf.OBSERVACION,
            approved: microprocessesListIf.SUPERVISADO,
            userCreator: microprocessesListIf.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesListIf.FECHA_ALTA)
        };
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_LISTAS',
                    nameInFile: 'ID LISTAS'
                },
                {
                    nameInTable: 'DESCRIPCION',
                    nameInFile: 'DESCRIPCIÓN'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
                }
            ];
            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = microprocessesListIfModel.knex.select(tableHeaders)
                .from(microprocessesListIfModel.tableName)
                .orderBy([{column: 'ID_TIPO_CHAT', order: 'asc'}])
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function() {
                resolve(csvString);
            });
        });
    }
}

module.exports = microprocessesListIfService;
