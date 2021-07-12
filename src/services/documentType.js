const { documentType: documentTypeModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

class DocumentTypeService {
    static async fetch() {
        const documentsTypes = await documentTypeModel.find({FECHA_BAJA: null});
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
        const documentType = await documentTypeModel.insertOne(formattedDocumentType);

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

    static async findOne(filters){
        const documentType = await documentTypeModel.findById({ID_TIPO_DOCUMENTO: filters.id});
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

    static async update(filters, params){
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
        const documentType = await documentTypeModel.updateOne({ID_TIPO_DOCUMENTO: filters.id}, formattedDocumentType);
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

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_DOCUMENTO: filters.id};
        const success = await documentTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_TIPO_DOCUMENTO',
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
            const stream = documentTypeModel.knex.select(tableHeaders)
                .from(documentTypeModel.tableName)
                .orderBy([{column: 'ID_TIPO_DOCUMENTO', order: 'asc'}])
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

module.exports = DocumentTypeService;
