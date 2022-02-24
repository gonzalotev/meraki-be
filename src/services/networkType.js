const { networkType: networkTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const toUpper = require('lodash/toUpper');

class NetworkTypeService {
    static async fetch() {
        const networksTypes = await networkTypeModel.find();
        return networksTypes.map(networkType => ({
            id: networkType.ID_TIPO_RED,
            description: networkType.DESCRIPCION,
            observation: networkType.OBSERVACION,
            domain: networkType.DOMINIO,
            approved: !!networkType.SUPERVISADO,
            createdAt: dateToString(networkType.FECHA_ALTA),
            userCreator: networkType.ID_USUARIO_ALTA
        }));
    }

    static async create(params, userCreator) {
        const formattedNetworkType = {
            ID_TIPO_RED: trim(params.id),
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: !!params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const networkTypeId = await networkTypeModel.insertOne(formattedNetworkType, ['ID_TIPO_RED']);
        const networkType = await NetworkTypeService.findOne({ id: networkTypeId });
        return networkType;
    }

    static async findOne(filters) {
        const networkType = await networkTypeModel.findById({ ID_TIPO_RED: filters.id });
        return {
            id: trim(networkType.ID_TIPO_RED),
            description: networkType.DESCRIPCION,
            observation: networkType.OBSERVACION,
            domain: networkType.DOMINIO,
            approved: !!networkType.SUPERVISADO,
            createdAt: dateToString(networkType.FECHA_ALTA),
            userCreator: networkType.ID_USUARIO_ALTA
        };
    }

    static async update(filters, params) {
        const formattedNetworkType = {
            ID_TIPO_RED: trim(params.id),
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: !!params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const networkTypeId = await networkTypeModel.updateOne({ ID_TIPO_RED: filters.id },
            formattedNetworkType, ['ID_TIPO_RED']);
        const networkType = await NetworkTypeService.findOne({ id: networkTypeId });
        return networkType;
    }

    static delete(networkTypeId) {
        return networkTypeModel.deleteOne({ID_TIPO_RED: networkTypeId});

    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = networkTypeModel.knex.select(columns)
                .from(networkTypeModel.tableName)
                .where()
                .stream();
            stream.on('error', function (err) {
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
            stream.on('end', function () {
                resolve(worksheet);
            });
        });
    }

    static getColumns() {
        return [
            {
                original: 'ID_TIPO_RED',
                modified: 'TIPO DE RED ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            }
        ];
    }
}

module.exports = NetworkTypeService;
