const { documentType } = include('models');
const { dateToString } = include('util');

class DocumentTypeService {
    static async fetch() {
        const documents = await documentType.find();
        return documents.map(document => ({
            id: document.ID_TIPO_DOCUMENTO,
            description: document.DESCRIPCION,
            observation: document.OBSERVACION,
            domain: document.DOMINIO,
            approved: document.SUPERVISADO,
            createdAt: dateToString(document.FECHA_ALTA),
            userCreator: document.ID_USUARIO_ALTA,
            userDeleted: document.ID_USUARIO_BAJA,
            deletedAt: dateToString(document.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedDocument = {
            ID_TIPO_DOCUMENTO: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const document = await documentType.insertOne(formattedDocument);

        return {
            id: document.ID_TIPO_DOCUMENTO,
            description: document.DESCRIPCION,
            observation: document.OBSERVACION,
            domain: document.DOMINIO,
            approved: !!document.SUPERVISADO,
            createdAt: dateToString(document.FECHA_ALTA),
            userCreator: document.ID_USUARIO_ALTA,
            userDeleted: document.ID_USUARIO_BAJA,
            deletedAt: dateToString(document.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const document = await documentType.findById({ID_TIPO_DOCUMENTO: filters.id});
        return {
            id: document.ID_TIPO_DOCUMENTO,
            description: document.DESCRIPCION,
            observation: document.OBSERVACION,
            domain: document.DOMINIO,
            approved: !!document.SUPERVISADO,
            createdAt: dateToString(document.FECHA_ALTA),
            userCreator: document.ID_USUARIO_ALTA,
            userDeleted: document.ID_USUARIO_BAJA,
            deletedAt: dateToString(document.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedDocument = {
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt,
            FECHA_ALTA: new Date()
        };
        const document = await documentType.updateOne({ID_TIPO_DOCUMENTO: filters.id}, formattedDocument);
        return {
            id: document.ID_TIPO_DOCUMENTO,
            description: document.DESCRIPCION,
            observation: document.OBSERVACION,
            domain: document.DOMINIO,
            approved: !!document.SUPERVISADO,
            createdAt: dateToString(document.FECHA_ALTA),
            userCreator: document.ID_USUARIO_ALTA,
            userDeleted: document.ID_USUARIO_BAJA,
            deletedAt: dateToString(document.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const success = await documentType.deleteOne({ID_TIPO_DOCUMENTO: filters.id}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = DocumentTypeService;
