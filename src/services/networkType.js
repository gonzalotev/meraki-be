const { networkType: networkTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

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
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const networkType = await networkTypeModel.insertOne(formattedNetworkType);

        return {
            id: networkType.ID_TIPO_RED,
            description: networkType.DESCRIPCION,
            observation: networkType.OBSERVACION,
            domain: networkType.DOMINIO,
            approved: !!networkType.SUPERVISADO,
            createdAt: dateToString(networkType.FECHA_ALTA),
            userCreator: networkType.ID_USUARIO_ALTA,
            userDeleted: networkType.ID_USUARIO_BAJA,
            deletedAt: dateToString(networkType.FECHA_BAJA)
        };
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
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const networkType = await networkTypeModel.updateOne({ID_TIPO_RED: filters.id},
            formattedNetworkType);
        return {
            id: networkType.ID_TIPO_RED,
            description: networkType.DESCRIPCION,
            observation: networkType.OBSERVACION,
            domain: networkType.DOMINIO,
            approved: !!networkType.SUPERVISADO,
            createdAt: dateToString(networkType.FECHA_ALTA),
            userCreator: networkType.ID_USUARIO_ALTA,
            userDeleted: networkType.ID_USUARIO_BAJA,
            deletedAt: dateToString(networkType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_RED: filters.id};
        const success = await networkTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = NetworkTypeService;
