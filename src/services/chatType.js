const { chatType: chatTypeModel } = include('models');
const { dateToString } = include('util');

class ChatTypeService {
    static async fetch() {
        const chatsTypes = await chatTypeModel.find();
        return chatsTypes.map(chatType => ({
            id: chatType.ID_TIPO_CHAT,
            description: chatType.DESCRIPCION,
            observation: chatType.OBSERVACION,
            domain: chatType.DOMINIO,
            approved: chatType.SUPERVISADO,
            createdAt: dateToString(chatType.FECHA_ALTA),
            userCreator: chatType.ID_USUARIO_ALTA,
            userDeleted: chatType.ID_USUARIO_BAJA,
            deletedAt: dateToString(chatType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedChatType = {
            ID_TIPO_CHAT: null,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const chatType = await chatTypeModel.insertOne(formattedChatType);

        return {
            id: chatType.ID_TIPO_CHAT,
            description: chatType.DESCRIPCION,
            observation: chatType.OBSERVACION,
            domain: chatType.DOMINIO,
            approved: chatType.SUPERVISADO,
            createdAt: dateToString(chatType.FECHA_ALTA),
            userCreator: chatType.ID_USUARIO_ALTA,
            userDeleted: chatType.ID_USUARIO_BAJA,
            deletedAt: dateToString(chatType.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const chatType = await chatTypeModel.findById({ID_TIPO_CHAT: filters.id});
        return {
            id: chatType.ID_TIPO_CHAT,
            description: chatType.DESCRIPCION,
            observation: chatType.OBSERVACION,
            domain: chatType.DOMINIO,
            approved: chatType.SUPERVISADO,
            createdAt: dateToString(chatType.FECHA_ALTA),
            userCreator: chatType.ID_USUARIO_ALTA,
            userDeleted: chatType.ID_USUARIO_BAJA,
            deletedAt: dateToString(chatType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedChatType = {
            ID_TIPO_CHAT: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt,
            FECHA_ALTA: new Date()
        };
        const chatType = await chatTypeModel.updateOne({ID_TIPO_CHAT: filters.id}, formattedChatType);
        return {
            id: chatType.ID_TIPO_CHAT,
            description: chatType.DESCRIPCION,
            observation: chatType.OBSERVACION,
            domain: chatType.DOMINIO,
            approved: chatType.SUPERVISADO,
            createdAt: dateToString(chatType.FECHA_ALTA),
            userCreator: chatType.ID_USUARIO_ALTA,
            userDeleted: chatType.ID_USUARIO_BAJA,
            deletedAt: dateToString(chatType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_CHAT: filters.id};
        const success = await chatTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return success;
    }
}

module.exports = ChatTypeService;
