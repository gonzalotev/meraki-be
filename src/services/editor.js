const { editor: editorModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class EditorService {
    static async fetch() {
        const editorsss = await editorModel.find({FECHA_BAJA: null});
        return editorsss.map(editor => ({
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
            ID_EDITOR: trim(params.id),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const editor = await editorModel.insertOne(formattedEditor);

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
        const editor = await editorModel.findById({ID_EDITOR: filters.id});
        return {
            id: editor.ID_EDITOR,
            description: editor.DESCRIPCION,
            observation: editor.OBSERVACION,
            domain: editor.DOMINIO,
            approved: editor.SUPERVISADO,
            createdAt: dateToString(editor.FECHA_ALTA),
            userCreator: editor.ID_USUARIO_ALTA,
            userDeleted: editor.ID_USUARIO_BAJA,
            deletedAt: dateToString(editor.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedEditor = {
            ID_EDITOR: params.id,
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const editor = await editorModel.updateOne({ID_EDITOR: filters.id}, formattedEditor);
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

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_EDITOR: filters.id};
        const success = await editorModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = EditorService;
