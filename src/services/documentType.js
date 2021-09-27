const { documentType: documentTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const uniq = require('lodash/uniq');
const find = require('lodash/find');
const isEmpty = require('lodash/isEmpty');

class DocumentTypeService {
    static async fetch() {
        const documentsTypes = await documentTypeModel.find({ FECHA_BAJA: null });
        return documentsTypes.map(documentType => ({
            id: documentType.ID_TIPO_DOCUMENTO,
            description: documentType.DESCRIPCION,
            observation: documentType.OBSERVACION,
            domain: documentType.DOMINIO,
            approved: documentType.SUPERVISADO,
            createdAt: dateToString(documentType.FECHA_ALTA),
            userCreator: documentType.ID_USUARIO_ALTA,
            userDeleted: documentType.ID_USUARIO_BAJA,
            deletedAt: dateToString(documentType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedDocumentType = {
            ID_TIPO_DOCUMENTO: null,
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const documentTypeId = await documentTypeModel.insertOne(formattedDocumentType, ['ID_TIPO_DOCUMENTO']);
        const documentType = await documentTypeModel.findOne({ ID_TIPO_DOCUMENTO: documentTypeId });
        return documentType;
    }

    static async findOne(filters) {
        const documentType = await documentTypeModel.findById({ ID_TIPO_DOCUMENTO: filters.id });
        return {
            id: documentType.ID_TIPO_DOCUMENTO,
            description: documentType.DESCRIPCION,
            observation: documentType.OBSERVACION,
            domain: documentType.DOMINIO,
            approved: documentType.SUPERVISADO,
            createdAt: dateToString(documentType.FECHA_ALTA),
            userCreator: documentType.ID_USUARIO_ALTA,
            userDeleted: documentType.ID_USUARIO_BAJA,
            deletedAt: dateToString(documentType.FECHA_BAJA)
        };
    }

    static async update(filters, params) {
        const formattedDocumentType = {
            ID_TIPO_DOCUMENTO: trim(params.id),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const documentType = await documentTypeModel.updateOne({ ID_TIPO_DOCUMENTO: filters.id },
            formattedDocumentType);
        return {
            id: documentType.ID_TIPO_DOCUMENTO,
            description: documentType.DESCRIPCION,
            observation: documentType.OBSERVACION,
            domain: documentType.DOMINIO,
            approved: !!documentType.SUPERVISADO,
            createdAt: dateToString(documentType.FECHA_ALTA),
            userCreator: documentType.ID_USUARIO_ALTA,
            userDeleted: documentType.ID_USUARIO_BAJA,
            deletedAt: dateToString(documentType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_TIPO_DOCUMENTO: filters.id };
        const success = await documentTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getDocumentTypeData(resources) {
        const documentTypesIds = uniq(map(resources, resource => resource.documentTypeId));
        if (isEmpty(documentTypesIds)) {
            return resources;
        }
        let documentTypes = await documentTypeModel.findByValues('ID_TIPO_DOCUMENTO', documentTypesIds);
        documentTypes = map(documentTypes, documentType => ({
            documentTypeId: documentType.ID_TIPO_DOCUMENTO,
            description: documentType.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.documentType = find(
                documentTypes,
                documentType => documentType.documentTypeId === resource.documentTypeId
            );
            return resource;
        });
    }

    /*static async getEditorData(resources) {
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
    }*/

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = documentTypeModel.knex.select(columns)
                .from(documentTypeModel.tableName)
                .where({ FECHA_BAJA: null })
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                worksheet.addRow(data);
            });
            stream.on('end', function () {
                resolve(worksheet);
            });
        });
    }

    static getColumns() {
        return [
            {
                original: 'ID_TIPO_DOCUMENTO',
                modified: 'ID'
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

module.exports = DocumentTypeService;
