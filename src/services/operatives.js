const { operatives: operativesModel } = include('models');
const { dateTimeToString } = include('util');
const trim = require('lodash/trim');

class OperativeService {
    static async find() {
        const operatives = await operativesModel.find();

        return operatives.map(operative => ({
            id: operative.ID_OPERATIVO,
            sourceId: operative.ID_FUENTE,
            description: operative.DESCRIPCION,
            domain: operative.DOMINIO,
            observation: operative.OBSERVACION,
            dateArrival: dateTimeToString(operative.FECHA_LLEGADA_OPERATIVO),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            contact: operative.CONTACTO_OPERATIVO,
            contactEmail: operative.MAIL_CONTACTO,
            encodingStartDate: dateTimeToString(operative.FECHA_INICIO_CODIFICACION),
            encodingEndDate: dateTimeToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateTimeToString(operative.FECHA_INICIO_ENTREGA),
            eraseStartDate: dateTimeToString(operative.FECHA_INICIO_BORRADO),
            eraseEndDate: dateTimeToString(operative.FECHA_FIN_BORRADO),
            totalQuality: operative.CALIDAD_TOTAL_OPERATIVO,
            errorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userId: operative.ID_USUARIO,
            createdAt: dateTimeToString(operative.FECHA_ALTA)
        }));
    }
    static async shortFetch(data) {
        const operatives = await operativesModel.find(
            {FECHA_BAJA: null},
            ['ID_OPERATIVO', 'DESCRIPCION']
        );
        const formattedOperatives = operatives.map(operative => ({
            id: operative.ID_OPERATIVO,
            description: operative.DESCRIPCION
        }));
        return data.operatives = formattedOperatives;
    }
    static async create(params, userCreator){
        const formattedOperative = {
            ID_FUENTE: params.sourceId,
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            FECHA_LLEGADA_OPERATIVO: null,
            FECHA_INICIO_CODIFICACION: null,
            FECHA_FIN_CODIFICACION: null,
            FECHA_INICIO_ENTREGA: null,
            FECHA_INICIO_BORRADO: null,
            FECHA_FIN_BORRADO: null,
            TOTAL_REGISTROS_OPERATIVO: params.totalRecords,
            CONTACTO_OPERATIVO: trim(params.contact),
            MAIL_CONTACTO: trim(params.contactEmail),
            CALIDAD_TOTAL_OPERATIVO: params.totalQuality,
            NIVEL_ERROR_OPERATIVO: params.errorLevel,
            ID_USUARIO: userCreator,
            FECHA_ALTA: new Date()
        };
        const operative = await operativesModel.insertOne(formattedOperative);
        return {
            id: operative.ID_OPERATIVO,
            sourceId: operative.ID_FUENTE,
            description: operative.DESCRIPCION,
            domain: operative.DOMINIO,
            observation: operative.OBSERVACION,
            dateArrival: dateTimeToString(operative.FECHA_LLEGADA_OPERATIVO),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            contact: operative.CONTACTO_OPERATIVO,
            contactEmail: operative.MAIL_CONTACTO,
            encodingStartDate: dateTimeToString(operative.FECHA_INICIO_CODIFICACION),
            encodingEndDate: dateTimeToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateTimeToString(operative.FECHA_INICIO_ENTREGA),
            eraseStartDate: dateTimeToString(operative.FECHA_INICIO_BORRADO),
            eraseEndDate: dateTimeToString(operative.FECHA_FIN_BORRADO),
            totalQuality: operative.CALIDAD_TOTAL_OPERATIVO,
            errorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userId: operative.ID_USUARIO,
            createdAt: dateTimeToString(operative.FECHA_ALTA)
        };
    }
    static async update(filters, params){
        const formattedOperative = {
            ID_FUENTE: params.sourceId,
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            FECHA_LLEGADA_OPERATIVO: params.dateArrival,
            FECHA_INICIO_CODIFICACION: params.encodingStartDate,
            FECHA_FIN_CODIFICACION: params.encodingEndDate,
            FECHA_INICIO_ENTREGA: params.deliveryStartDate,
            FECHA_INICIO_BORRADO: params.eraseStartDate,
            FECHA_FIN_BORRADO: params.eraseEndDate,
            TOTAL_REGISTROS_OPERATIVO: params.totalRecords,
            CONTACTO_OPERATIVO: trim(params.contact),
            MAIL_CONTACTO: trim(params.contactEmail),
            CALIDAD_TOTAL_OPERATIVO: params.totalQuality,
            NIVEL_ERROR_OPERATIVO: params.errorLevel
        };
        const formattedFilters = {ID_OPERATIVO: filters.id};
        const operative = await operativesModel.updateOne(formattedFilters, formattedOperative);
        return {
            id: operative.ID_OPERATIVO,
            sourceId: operative.ID_FUENTE,
            description: operative.DESCRIPCION,
            domain: operative.DOMINIO,
            observation: operative.OBSERVACION,
            dateArrival: dateTimeToString(operative.FECHA_LLEGADA_OPERATIVO),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            contact: operative.CONTACTO_OPERATIVO,
            contactEmail: operative.MAIL_CONTACTO,
            encodingStartDate: dateTimeToString(operative.FECHA_INICIO_CODIFICACION),
            encodingEndDate: dateTimeToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateTimeToString(operative.FECHA_INICIO_ENTREGA),
            eraseStartDate: dateTimeToString(operative.FECHA_INICIO_BORRADO),
            eraseEndDate: dateTimeToString(operative.FECHA_FIN_BORRADO),
            totalQuality: operative.CALIDAD_TOTAL_OPERATIVO,
            errorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userId: operative.ID_USUARIO,
            createdAt: dateTimeToString(operative.FECHA_ALTA)
        };
    }
    static async findOne(filters){
        const formattedFilters = {ID_OPERATIVO: filters.id};
        const operative = await operativesModel.findById(formattedFilters);
        return {
            id: operative.ID_OPERATIVO,
            sourceId: operative.ID_FUENTE,
            description: operative.DESCRIPCION,
            domain: operative.DOMINIO,
            observation: operative.OBSERVACION,
            dateArrival: dateTimeToString(operative.FECHA_LLEGADA_OPERATIVO),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            contact: operative.CONTACTO_OPERATIVO,
            contactEmail: operative.MAIL_CONTACTO,
            encodingStartDate: dateTimeToString(operative.FECHA_INICIO_CODIFICACION),
            encodingEndDate: dateTimeToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateTimeToString(operative.FECHA_INICIO_ENTREGA),
            eraseStartDate: dateTimeToString(operative.FECHA_INICIO_BORRADO),
            eraseEndDate: dateTimeToString(operative.FECHA_FIN_BORRADO),
            totalQuality: operative.CALIDAD_TOTAL_OPERATIVO,
            errorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userId: operative.ID_USUARIO,
            createdAt: dateTimeToString(operative.FECHA_ALTA)
        };
    }
}

module.exports = OperativeService;
