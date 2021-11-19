const { operativeLot: operativeLotModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

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

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = operativeLotModel.knex.select(columns)
                .from(operativeLotModel.tableName)
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
                original: 'ID_TIPO_FRASE_ESPECIAL',
                modified: 'TIPO FRASE ESPECIAL ID'
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
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = OperativeLotService;
