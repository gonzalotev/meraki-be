const { operativeLot: operativeLotModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

class OperativeLotService {
    static async fetch() {
        const lotss = await operativeLotModel.find({FECHA_BAJA: null});
        return lotss.map(operativeLot => ({
            id: operativeLot.ID_TIPO_FRASE_ESPECIAL,
            description: operativeLot.DESCRIPCION,
            observation: operativeLot.OBSERVACION,
            domain: operativeLot.DOMINIO,
            approved: operativeLot.SUPERVISADO,
            createdAt: dateToString(operativeLot.FECHA_ALTA),
            userCreator: operativeLot.ID_USUARIO_ALTA,
            userDeleted: operativeLot.ID_USUARIO_BAJA,
            deletedAt: dateToString(operativeLot.FECHA_BAJA)
        }));

    }

    static async create(params, userCreator) {
        const formattedOperativeLot = {
            ID_TIPO_FRASE_ESPECIAL: null,
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const operativeLotId = await operativeLotModel.insertOne(formattedOperativeLot, ['ID_TIPO_FRASE_ESPECIAL']);
        const operativeLot = await OperativeLotService.findOne({id: operativeLotId});
        return operativeLot;
    }

    static async findOne(filters){
        const operativeLot = await operativeLotModel.findById({ID_TIPO_FRASE_ESPECIAL: filters.id});
        return {
            id: operativeLot.ID_TIPO_FRASE_ESPECIAL,
            description: operativeLot.DESCRIPCION,
            observation: operativeLot.OBSERVACION,
            domain: operativeLot.DOMINIO,
            approved: operativeLot.SUPERVISADO,
            createdAt: dateToString(operativeLot.FECHA_ALTA),
            userCreator: operativeLot.ID_USUARIO_ALTA,
            userDeleted: operativeLot.ID_USUARIO_BAJA,
            deletedAt: dateToString(operativeLot.FECHA_BAJA)
        };
    }

    static async update(filters, params, transaction){
        const formattedOperativeLot = {
            ID_TIPO_FRASE_ESPECIAL: trim(params.id),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const operativeLotId = await operativeLotModel.updateOne({ID_TIPO_FRASE_ESPECIAL: filters.id},
            formattedOperativeLot, ['ID_TIPO_FRASE_ESPECIAL'], transaction);
        const operativeLot = await OperativeLotService.findOne({id: operativeLotId});
        return operativeLot;
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_FRASE_ESPECIAL: filters.id};
        const success = await operativeLotModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_TIPO_FRASE_ESPECIAL',
                    nameInFile: 'ID'
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
            const stream = operativeLotModel.knex.select(tableHeaders)
                .from(operativeLotModel.tableName)
                .orderBy([{column: 'ID_TIPO_FRASE_ESPECIAL', order: 'asc'}])
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

module.exports = OperativeLotService;