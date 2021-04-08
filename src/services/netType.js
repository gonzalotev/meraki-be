const { netType } = include('models');
const { dateToString } = include('util');

class NetTypeService {
    static async fetch() {
        const nets = await netType.find();
        return nets.map(net => ({
            id: net.ID_TIPO_RED,
            description: net.DESCRIPCION,
            observation: net.OBSERVACION,
            domain: net.DOMINIO,
            approved: net.SUPERVISADO,
            createdAt: dateToString(net.FECHA_ALTA),
            userCreator: net.ID_USUARIO_ALTA,
            userDeleted: net.ID_USUARIO_BAJA,
            deletedAt: dateToString(net.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedNet = {
            ID_TIPO_RED: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const net = await netType.insertOne(formattedNet);

        return {
            id: net.ID_TIPO_RED,
            description: net.DESCRIPCION,
            observation: net.OBSERVACION,
            domain: net.DOMINIO,
            approved: !!net.SUPERVISADO,
            createdAt: dateToString(net.FECHA_ALTA),
            userCreator: net.ID_USUARIO_ALTA,
            userDeleted: net.ID_USUARIO_BAJA,
            deletedAt: dateToString(net.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const net = await netType.findById({ID_TIPO_RED: filters.id});
        return {
            id: net.ID_TIPO_RED,
            description: net.DESCRIPCION,
            observation: net.OBSERVACION,
            domain: net.DOMINIO,
            approved: !!net.SUPERVISADO,
            createdAt: dateToString(net.FECHA_ALTA),
            userCreator: net.ID_USUARIO_ALTA,
            userDeleted: net.ID_USUARIO_BAJA,
            deletedAt: dateToString(net.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedNet = {
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt,
            FECHA_ALTA: new Date()
        };
        const net = await netType.updateOne({ID_TIPO_RED: filters.id}, formattedNet);
        return {
            id: net.ID_TIPO_RED,
            description: net.DESCRIPCION,
            observation: net.OBSERVACION,
            domain: net.DOMINIO,
            approved: !!net.SUPERVISADO,
            createdAt: dateToString(net.FECHA_ALTA),
            userCreator: net.ID_USUARIO_ALTA,
            userDeleted: net.ID_USUARIO_BAJA,
            deletedAt: dateToString(net.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const success = await netType.deleteOne({ID_TIPO_RED: filters.id}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = NetTypeService;
