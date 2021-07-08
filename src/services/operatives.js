const { operatives } = include('models');
const { dateToString, stringToDate, dateTimeToString, arrayToCsvFormat } = include('util');
const SourceQuestionRelationService = require('./sourceQuestionsRelations');
const map = require('lodash/map');

class OperativesService {
    static async fetch({page, search}) {
        const orderBy = [{column: 'DESCRIPCION', order: 'asc'}];
        const filterBy = {FECHA_BAJA: null};
        const columnsToSelect = operatives.selectableProps;
        let operativess=[];
        if(page && search) {
            operativess = await operatives.findByMatch(
                page,
                search,
                ['DESCRIPCION'],
                filterBy,
                orderBy
            );
        } else if(page){
            operativess = await operatives.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            operativess = await operatives.find(filterBy, columnsToSelect, orderBy);
        }
        operativess = operativess.map(operative => ({
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

        await SourceQuestionRelationService.getSourceData(operativess);
        return operativess;
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
            arrivalDate: dateTimeToString(operative.FECHA_LLEGADA_OPERATIVO),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            operatingContact: operative.CONTACTO_OPERATIVO,
            mailContact: operative.MAIL_CONTACTO,
            codingStartDate: dateTimeToString(operative.FECHA_INICIO_CODIFICACION),
            codingEndDate: dateTimeToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateTimeToString(operative.FECHA_INICIO_ENTREGA),
            deletedStartDate: dateTimeToString(operative.FECHA_INICIO_BORRADO),
            deletedEndDate: dateTimeToString(operative.FECHA_FIN_BORRADO),
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
            FECHA_LLEGADA_OPERATIVO: null,
            TOTAL_REGISTROS_OPERATIVO: params.totalRecords,
            CONTACTO_OPERATIVO: params.operatingContact,
            MAIL_CONTACTO: params.mailContact,
            FECHA_INICIO_CODIFICACION: null,
            FECHA_FIN_CODIFICACION: null,
            FECHA_INICIO_ENTREGA: null,
            FECHA_INICIO_BORRADO: null,
            CALIDAD_TOTAL_OPERATIVO: params.qualityOperational,
            NIVEL_ERROR_OPERATIVO: params.operatingErrorLevel,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null
        };
        const formattedFilters = {ID_OPERATIVO: params.operativeId};
        const operativeId = await operatives.updateOne(formattedFilters, formattedOperative, ['ID_OPERATIVO']);
        const operative = await OperativesService.findOne({operativeId: operativeId});
        return operative;
    }

    static async delete(filters, userDeleted){
        const success = await operatives.deleteOne({ID_OPERATIVO: filters.operativeId}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getTotal({operative}){
        let result;
        if(operative){
            result = await operatives.countTotal({ID_OPERATIVO: operative, FECHA_BAJA: null});
        } else {
            result = await operatives.countTotal({FECHA_BAJA: null});
        }
        return result.total;
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
