const { editor: editorModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const uniq = require('lodash/uniq');
const find = require('lodash/find');
const isDate = require('lodash/isDate');
const isEmpty = require('lodash/isEmpty');
const toUpper = require('lodash/toUpper');

class EditorService {
    static async fetch({ page, search }) {
        const orderBy = [{ column: 'ID_EDITOR', order: 'asc' }];
        const filterBy = {FECHA_BAJA: null};
        const columnsToSelect = editorModel.selectableProps;
        let editorsss = [];
        if (page && search) {
            editorsss = await editorModel.fetchByPageAndTerm(page, search);
        } else if (page) {
            editorsss = await editorModel.findByPage(page, filterBy, columnsToSelect, orderBy);
        } else {
            editorsss = await editorModel.find();
        }
        editorsss = editorsss.map(editor => ({
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

        return (editorsss);
    }

    static async getTotal({ search }) {
        const { total } = await editorModel.countTotal({}, search, ['DESCRIPCION']);
        return total;
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
        const editor = await EditorService.findOne({ id: editorId });
        return editor;
    }

    static async findOne(filters) {
        const editor = await editorModel.findById({ ID_EDITOR: filters.id });
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

    static async update(filters, params) {
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
        const editorId = await editorModel.updateOne({ ID_EDITOR: filters.id }, formattedEditor, ['ID_EDITOR']);
        const editor = await EditorService.findOne({ id: editorId });
        return editor;
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_EDITOR: filters.id };
        const success = await editorModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getEditorData(resources) {
        const editorsIds = uniq(map(resources, resource => resource.editorId));
        if (isEmpty(editorsIds)) {
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

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = editorModel.knex.select(columns)
                .from(editorModel.tableName)
                .where({ FECHA_BAJA: null })
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
                original: 'ID_EDITOR',
                modified: 'EDITOR ID'
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

module.exports = EditorService;
