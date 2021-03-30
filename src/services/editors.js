const { editors } = include('models');
const { dateToString } = include('util');

class EditorsService {
    static async fetch() {
        const editorList = await editors.find();
        return editorList.map(editor => ({
            id: editor.ID_EDITOR,
            description: editor.DESCRIPCION,
            observation: editor.OBSERVACION,
            domain: editor.DOMINIO,
            approved: editor.SUPERVISADO,
            createdAt: dateToString(editor.FECHA_ALTA),
            userCreator: editor.ID_USUARIO_ALTA,
            userDeleted: editor.ID_USUARIO_BAJA,
            deletedAt: dateToString(editor.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedEditor = {
            ID_EDITOR: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const editor = await editors.insertOne(formattedEditor);

        return {
            id: editor.ID_EDITOR,
            description: editor.DESCRIPCION,
            observation: editor.OBSERVACION,
            domain: editor.DOMINIO,
            approved: !!editor.SUPERVISADO,
            createdAt: dateToString(editor.FECHA_ALTA),
            userCreator: editor.ID_USUARIO_ALTA,
            userDeleted: editor.ID_USUARIO_BAJA,
            deletedAt: dateToString(editor.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const editor = await editors.findById({ID_EDITOR: filters.id});
        return {
            id: editor.ID_EDITOR,
            description: editor.DESCRIPCION,
            observation: editor.OBSERVACION,
            domain: editor.DOMINIO,
            approved: !!editor.SUPERVISADO,
            createdAt: dateToString(editor.FECHA_ALTA),
            userCreator: editor.ID_USUARIO_ALTA,
            userDeleted: editor.ID_USUARIO_BAJA,
            deletedAt: dateToString(editor.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedEditor = {
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt,
            FECHA_ALTA: new Date()
        };
        const editor = await editors.updateOne({ID_EDITOR: filters.id}, formattedEditor);
        return {
            id: editor.ID_TIPO_DOCUMENTO,
            description: editor.DESCRIPCION,
            observation: editor.OBSERVACION,
            domain: editor.DOMINIO,
            approved: !!editor.SUPERVISADO,
            createdAt: dateToString(editor.FECHA_ALTA),
            userCreator: editor.ID_USUARIO_ALTA,
            userDeleted: editor.ID_USUARIO_BAJA,
            deletedAt: dateToString(editor.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const success = await editors.deleteOne({ID_EDITOR: filters.id}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = EditorsService;
