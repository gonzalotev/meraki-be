const { editor: editorModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const uniq = require('lodash/uniq');
const find = require('lodash/find');
const isEmpty = require('lodash/isEmpty');
const toUpper = require('lodash/toUpper');

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
            ID_EDITOR: null,
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const editorId = await editorModel.insertOne(formattedEditor, ['ID_EDITOR']);
        const editor = await EditorService.findOne({id: editorId});
        return editor;
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
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const editorId = await editorModel.updateOne({ID_EDITOR: filters.id}, formattedEditor, ['ID_EDITOR']);
        const editor = await EditorService.findOne({id: editorId});
        return editor;
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_EDITOR: filters.id};
        const success = await editorModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getEditorData(resources){
        const editorsIds = uniq(map(resources, resource => resource.editorId));
        if(isEmpty(editorsIds)){
            return resources;
        }
        let editors = await editorModel.findByValues('ID_EDITOR', editorsIds);
        editors = map(editors, editor => ({
            editorId: editor.ID_EDITOR,
            description: editor.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.editor = find(
                editors,
                editor => editor.editorId === resource.editorId
            );
            return resource;
        });
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_EDITOR',
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
            const stream = editorModel.knex.select(tableHeaders)
                .from(editorModel.tableName)
                .orderBy([{column: 'ID_EDITOR', order: 'asc'}])
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

module.exports = EditorService;
