const { networkType: networkTypeModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const toUpper = require('lodash/toUpper');

class NetworkTypeService {
    static async fetch() {
        const networksTypes = await networkTypeModel.find({FECHA_BAJA: null});
        return networksTypes.map(networkType => ({
            id: networkType.ID_TIPO_RED,
            description: networkType.DESCRIPCION,
            observation: networkType.OBSERVACION,
            domain: networkType.DOMINIO,
            approved: networkType.SUPERVISADO,
            createdAt: dateToString(networkType.FECHA_ALTA),
            userCreator: networkType.ID_USUARIO_ALTA,
            userDeleted: networkType.ID_USUARIO_BAJA,
            deletedAt: dateToString(networkType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedNetworkType = {
            ID_TIPO_RED: trim(params.id),
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const networkTypeId = await networkTypeModel.insertOne(formattedNetworkType, ['ID_TIPO_RED']);
        const networkType = await NetworkTypeService.findOne({id: networkTypeId});
        return networkType;
    }

    static async findOne(filters){
        const networkType = await networkTypeModel.findById({ID_TIPO_RED: filters.id});
        return {
            id: networkType.ID_TIPO_RED,
            description: networkType.DESCRIPCION,
            observation: networkType.OBSERVACION,
            domain: networkType.DOMINIO,
            approved: networkType.SUPERVISADO,
            createdAt: dateToString(networkType.FECHA_ALTA),
            userCreator: networkType.ID_USUARIO_ALTA,
            userDeleted: networkType.ID_USUARIO_BAJA,
            deletedAt: dateToString(networkType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedNetworkType = {
            ID_TIPO_RED: trim(params.id),
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const networkTypeId = await networkTypeModel.updateOne({ID_TIPO_RED: filters.id},
            formattedNetworkType, ['ID_TIPO_RED']);
        const networkType = await NetworkTypeService.findOne({id: networkTypeId});
        return networkType;
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_RED: filters.id};
        const success = await networkTypeModel.deleteOne(formattedFilters, {
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
                    nameInTable: 'ID_TIPO_RED',
                    nameInFile: 'ID'
                },
                {
                    nameInTable: 'DESCRIPCION',
                    nameInFile: 'DESCRIPCIÓN'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                }
            ];
            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = networkTypeModel.knex.select(tableHeaders)
                .from(networkTypeModel.tableName)
                .orderBy([{column: 'ID_TIPO_RED', order: 'asc'}])
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

module.exports = NetworkTypeService;
