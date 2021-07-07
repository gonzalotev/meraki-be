const { operatives } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const map = require('lodash/map');

class OperativesService {
    static async fetch() {
        const operativess = await operatives.find({FECHA_BAJA: null});
        return operativess.map(operative => ({
            sourceId: operative.ID_FUENTE,
            operativeId: operative.ID_OPERATIVO,
            description: operative.DESCRIPCION,
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            arrivalDate: dateToString(operative.FECHA_LLEGADA_OPERATIVO),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            operatingContact: operative.CONTACTO_OPERATIVO,
            mailContact: operative.MAIL_CONTACTO,
            codingStartDate: dateToString(operative.FECHA_INICIO_CODIFICACION),
            codingEndDate: dateToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateToString(operative.FECHA_INICIO_ENTREGA),
            deletedStartDate: dateToString(operative.FECHA_INICIO_BORRADO),
            deletedEndDate: dateToString(operative.FECHA_FIN_BORRADO),
            qualityOperational: operative.CALIDAD_TOTAL_OPERATIVO,
            operatingErrorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userCreator: operative.ID_USUARIO_ALTA,
            userDeleted: operative.ID_USUARIO_BAJA,
            createdAt: dateToString(operative.FECHA_ALTA),
            deletedAt: dateToString(operative.FECHA_BAJA)

        }));
    }

    static async create(params, userCreator) {
        const formattedOperative = {
            ID_FUENTE: params.sourceId,
            ID_OPERATIVO: params.operativeId,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            FECHA_LLEGADA_OPERATIVO: stringToDate(params.arrivalDate),
            TOTAL_REGISTROS_OPERATIVO: params.totalRecords,
            CONTACTO_OPERATIVO: params.operatingContact,
            MAIL_CONTACTO: params.mailContact,
            FECHA_INICIO_CODIFICACION: stringToDate(params.codingStartDate),
            FECHA_FIN_CODIFICACION: stringToDate(params.codingStartDate),
            FECHA_INICIO_ENTREGA: stringToDate(params.deliveryStartDate),
            FECHA_INICIO_BORRADO: stringToDate(params.deletedEndDate),
            CALIDAD_TOTAL_OPERATIVO: params.qualityOperational,
            NIVEL_ERROR_OPERATIVO: params.operatingErrorLevel,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: params.createdAt,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt
        };
        const operativeId = await operatives.insertOne(formattedOperative, ['ID_OPERATIVO']);
        const operative = await OperativesService.findOne({operativeId: operativeId});
        return operative;
    }

    static async findOne(filters){
        const formattedFilters = {ID_OPERATIVO: filters.operativeId};
        const operative = await operatives.findById(formattedFilters);
        return {
            sourceId: operative.ID_FUENTE,
            operativeId: operative.ID_OPERATIVO,
            description: operative.DESCRIPCION,
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            arrivalDate: dateToString(operative.FECHA_LLEGADA_OPERATIVO),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            operatingContact: operative.CONTACTO_OPERATIVO,
            mailContact: operative.MAIL_CONTACTO,
            codingStartDate: dateToString(operative.FECHA_INICIO_CODIFICACION),
            codingEndDate: dateToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateToString(operative.FECHA_INICIO_ENTREGA),
            deletedStartDate: dateToString(operative.FECHA_INICIO_BORRADO),
            deletedEndDate: dateToString(operative.FECHA_FIN_BORRADO),
            qualityOperational: operative.CALIDAD_TOTAL_OPERATIVO,
            operatingErrorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userCreator: operative.ID_USUARIO_ALTA,
            userDeleted: operative.ID_USUARIO_BAJA,
            createdAt: dateToString(operative.FECHA_ALTA),
            deletedAt: dateToString(operative.FECHA_BAJA)
        };
    }

    static async update(filters, params, userCreator){
        const formattedOperative = {
            ID_FUENTE: params.sourceId,
            ID_OPERATIVO: params.operativeId,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            FECHA_LLEGADA_OPERATIVO: params.arrivalDate,
            TOTAL_REGISTROS_OPERATIVO: params.totalRecords,
            CONTACTO_OPERATIVO: params.operatingContact,
            MAIL_CONTACTO: params.mailContact,
            FECHA_INICIO_CODIFICACION: params.codingStartDate,
            FECHA_FIN_CODIFICACION: params.codingStartDate,
            FECHA_INICIO_ENTREGA: params.deliveryStartDate,
            FECHA_INICIO_BORRADO: params.deletedEndDate,
            CALIDAD_TOTAL_OPERATIVO: params.qualityOperational,
            NIVEL_ERROR_OPERATIVO: params.operatingErrorLevel,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: params.createdAt,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt
        };
        const formattedFilters = {ID_OPERATIVO: filters.operativeId};
        const operative = await operatives.updateOne(formattedFilters, formattedOperative);
        return {
            sourceId: operative.ID_FUENTE,
            operativeId: operative.ID_OPERATIVO,
            description: operative.DESCRIPCION,
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            arrivalDate: operative.FECHA_LLEGADA_OPERATIVO,
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            operatingContact: operative.CONTACTO_OPERATIVO,
            mailContact: operative.MAIL_CONTACTO,
            codingStartDate: dateToString(operative.FECHA_INICIO_CODIFICACION),
            codingEndDate: dateToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateToString(operative.FECHA_INICIO_ENTREGA),
            deletedStartDate: dateToString(operative.FECHA_INICIO_BORRADO),
            deletedEndDate: dateToString(operative.FECHA_FIN_BORRADO),
            qualityOperational: operative.CALIDAD_TOTAL_OPERATIVO,
            operatingErrorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userCreator: operative.ID_USUARIO_ALTA,
            userDeleted: operative.ID_USUARIO_BAJA,
            createdAt: dateToString(operative.FECHA_ALTA),
            deletedAt: dateToString(operative.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const success = await operatives.deleteOne({ID_OPERATIVO: filters.operativeId}, {
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
                    nameInTable: 'ID_FUENTE',
                    nameInFile: 'ID'
                },
                {
                    nameInTable: 'DESCRIPCION',
                    nameInFile: 'DESCRIPCION'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACION'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                },
                {
                    nameInTable: 'CONTACTO_OPERATIVO',
                    nameInFile: 'CONTACTO OPERATIVO'
                },
                {
                    nameInTable: 'MAIL_CONTACTO',
                    nameInFile: 'MAIL CONTACTO'
                }
            ];
            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = operatives.knex.select(tableHeaders)
                .from(operatives.tableName)
                .orderBy([{column: 'ID_FUENTE', order: 'asc'}])
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

module.exports = OperativesService;
