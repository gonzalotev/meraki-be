const { documents: documentsModel } = include('models');
const { dateToString, stringToDate } = include('util');
const EditorService = require ('./editor.js');
const DocumentTypeService = require ('./documentType.js');

class DocumentsService {
    static async fetch() {
        let documentss = await documentsModel.find({FECHA_BAJA: null});
        documentss = documentss.map(documents => ({
            documentId: documents.ID_DOCUMENTO,
            documentTypeId: documents.ID_TIPO_DOCUMENTO,
            title: documents.TITULO,
            author: documents.AUTOR,
            institution: documents.INSTITUCION,
            area: documents.AREA,
            documentDate: dateToString(documents.FECHA_DOCUMENTO),
            isbn: documents.ISBN,
            editorId: documents.ID_EDITOR,
            fileLocation: documents.UBICACION_ARCHIVO,
            summary: documents.RESUMEN,
            url: documents.URL,
            commentary: documents.COMENTARIO,
            numberOfVisits: documents.CANTIDAD_VISITAS,
            userCreator: documents.ID_USUARIO_ALTA,
            createdAt: dateToString(documents.FECHA_ALTA),
            userDeleted: documents.ID_USUARIO_BAJA,
            deletedAt: dateToString(documents.FECHA_BAJA)
        }));

        await EditorService.getEditorData(documentss);
        await DocumentTypeService.getDocumentTypeData(documentss);
        return (documentss);
    }

    static async create(params, userCreator) {
        const formattedDocument = {
            ID_TIPO_DOCUMENTO: params.documentTypeId,
            TITULO: params.title,
            AUTOR: params.author,
            INSTITUCION: params.institution,
            AREA: params.area,
            FECHA_DOCUMENTO: stringToDate(params.documentDate),
            ISBN: params.isbn,
            ID_EDITOR: params.editorId,
            UBICACION_ARCHIVO: params.fileLocation,
            RESUMEN: params.summary,
            URL: params.url,
            COMENTARIO: params.commentary,
            CANTIDAD_VISITAS: params.numberOfVisits,
            ID_USUARIO_ALTA: userCreator,
            FECHA_BAJA: null,
            ID_USUARIO_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const document = await documentsModel.insertOne(formattedDocument, ['ID_DOCUMENTO', 'ID_TIPO_DOCUMENTO', 'TITULO', 'AUTOR', 'ID_EDITOR']);
        const docu = await DocumentsService.findOne(
            {
                documentId: document.ID_DOCUMENTO,
                documentTypeId: document.ID_TIPO_DOCUMENTO,
                title: document.TITULO,
                author: document.AUTOR,
                editorId: document.ID_EDITOR
            }
        );
        return docu;
    }

    static async findOne(filters){
        const document = await documentsModel.findById({ID_DOCUMENTO: filters.documentId});
        return {
            documentId: document.ID_DOCUMENTO,
            documentTypeId: document.ID_TIPO_DOCUMENTO,
            title: document.TITULO,
            author: document.AUTOR,
            institution: document.INSTITUCION,
            area: document.AREA,
            documentDate: dateToString(document.FECHA_DOCUMENTO),
            isbn: document.ISBN,
            editorId: document.ID_EDITOR,
            fileLocation: document.UBICACION_ARCHIVO,
            summary: document.RESUMEN,
            url: document.URL,
            commentary: document.COMENTARIO,
            numberOfVisits: document.CANTIDAD_VISITAS,
            userCreator: document.ID_USUARIO_ALTA,
            createdAt: dateToString(document.FECHA_ALTA),
            userDeleted: document.ID_USUARIO_BAJA,
            deletedAt: dateToString(document.FECHA_BAJA)
        };
    }

    static async update(filters, params) {
        const formattedDocument = {
            ID_TIPO_DOCUMENTO: params.documentTypeId,
            TITULO: params.title,
            AUTOR: params.author,
            INSTITUCION: params.institution,
            AREA: params.area,
            FECHA_DOCUMENTO: stringToDate(params.documentDate),
            ISBN: params.isbn,
            ID_EDITOR: params.editorId,
            UBICACION_ARCHIVO: params.fileLocation,
            RESUMEN: params.summary,
            URL: params.url,
            COMENTARIO: params.commentary,
            CANTIDAD_VISITAS: params.numberOfVisits,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
        };
        // eslint-disable-next-line no-use-before-define
        const documentId = await documentsModel.updateOne({ ID_DOCUMENTO: filters.documentId },
            formattedDocument, ['ID_DOCUMENTO']);
        const document = await DocumentsService.findOne({ documentId: documentId });
        return document;
    }

    static async delete( filters ) {
        const formattedFilters = { ID_DOCUMENTO: filters.documentId };
        const success = await documentsModel.delete(formattedFilters, {
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = documentsModel.knex.select(columns)
                .from(documentsModel.tableName)
                .where({FECHA_BAJA: null})
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                worksheet.addRow(data);
            });
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }

    static getColumns(){
        return [
            {
                original: 'ID_DOCUMENTO',
                modified: 'ID_DOCUMENTO'
            },
            {
                original: 'ID_TIPO_DOCUMENTO',
                modified: 'ID_TIPO_DOCUMENTO'
            },
            {
                original: 'TITULO',
                modified: 'TITULO'
            },
            {
                original: 'AUTOR',
                modified: 'AUTOR'
            },
            {
                original: 'INSTITUCION',
                modified: 'INSTITUCION'
            },
            {
                original: 'AREA',
                modified: 'AREA'
            },
            {
                original: 'FECHA_DOCUMENTO',
                modified: 'FECHA_DOCUMENTO'
            },
            {
                original: 'ISBN',
                modified: 'ISBN'
            },
            {
                original: 'ID_EDITOR',
                modified: 'ID_EDITOR'
            },
            {
                original: 'UBICACION_ARCHIVO',
                modified: 'UBICACION_ARCHIVO'
            },
            {
                original: 'RESUMEN',
                modified: 'RESUMEN'
            },
            {
                original: 'URL',
                modified: 'URL'
            },
            {
                original: 'COMENTARIO',
                modified: 'COMENTARIO'
            },
            {
                original: 'CANTIDAD_VISITAS',
                modified: 'CANTIDAD_VISITAS'
            }
        ];
    }
}

module.exports = DocumentsService;
