const { operatives } = include('models');
const { dateToString, dateString, stringDate } = include('util');
const OperativeSourcesService = require('./operativeSources');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const uniq = require('lodash/uniq');
const find = require('lodash/find');

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
            arrivalDate: dateString(operative.FECHA_LLEGADA_OPERATIVO, 'YYYY-MM-DDTHH:mm:ss'),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            operatingContact: operative.CONTACTO_OPERATIVO,
            mailContact: operative.MAIL_CONTACTO,
            codingStartDate: dateString(operative.FECHA_INICIO_CODIFICACION, 'YYYY-MM-DDTHH:mm:ss'),
            codingEndDate: dateString(operative.FECHA_FIN_CODIFICACION, 'YYYY-MM-DDTHH:mm:ss'),
            deliveryStartDate: dateString(operative.FECHA_INICIO_ENTREGA, 'YYYY-MM-DDTHH:mm:ss'),
            deletedStartDate: dateString(operative.FECHA_INICIO_BORRADO, 'YYYY-MM-DDTHH:mm:ss'),
            deletedEndDate: dateString(operative.FECHA_FIN_BORRADO, 'YYYY-MM-DDTHH:mm:ss'),
            qualityOperational: operative.CALIDAD_TOTAL_OPERATIVO,
            operatingErrorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userCreator: operative.ID_USUARIO_ALTA,
            userDeleted: operative.ID_USUARIO_BAJA,
            createdAt: dateString(operative.FECHA_ALTA, 'YYYY-MM-DD'),
            deletedAt: dateString(operative.FECHA_BAJA, 'YYYY-MM-DD')
        }));

        await OperativeSourcesService.getSourceData(operativess);
        return operativess;
    }

    static async create(params, userCreator) {
        const formattedOperative = {
            ID_FUENTE: params.sourceId,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            FECHA_LLEGADA_OPERATIVO: stringDate(params.arrivalDate, 'YYYY-MM-DDTHH:mm:ss'),
            CONTACTO_OPERATIVO: params.operatingContact,
            MAIL_CONTACTO: params.mailContact,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const operativeId = await operatives.insertOne(formattedOperative, ['ID_OPERATIVO']);
        const operative = await OperativesService.findOne({operativeId});
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
            arrivalDate: dateString(operative.FECHA_LLEGADA_OPERATIVO, 'YYYY-MM-DDTHH:mm:ss'),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            operatingContact: operative.CONTACTO_OPERATIVO,
            mailContact: operative.MAIL_CONTACTO,
            codingStartDate: dateString(operative.FECHA_INICIO_CODIFICACION, 'YYYY-MM-DDTHH:mm:ss'),
            codingEndDate: dateString(operative.FECHA_FIN_CODIFICACION, 'YYYY-MM-DDTHH:mm:ss'),
            deliveryStartDate: dateString(operative.FECHA_INICIO_ENTREGA, 'YYYY-MM-DDTHH:mm:ss'),
            deletedStartDate: dateString(operative.FECHA_INICIO_BORRADO, 'YYYY-MM-DDTHH:mm:ss'),
            deletedEndDate: dateString(operative.FECHA_FIN_BORRADO, 'YYYY-MM-DDTHH:mm:ss'),
            qualityOperational: operative.CALIDAD_TOTAL_OPERATIVO,
            operatingErrorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userCreator: operative.ID_USUARIO_ALTA,
            userDeleted: operative.ID_USUARIO_BAJA,
            createdAt: dateString(operative.FECHA_ALTA, 'YYYY-MM-DD'),
            deletedAt: dateString(operative.FECHA_BAJA, 'YYYY-MM-DD')
        };
    }

    static async findMatching(filters) {
        const formattedFilters = { DESCRIPCION: filters.description };
        const matchWords = await operatives.findByMatch(formattedFilters);
        return matchWords.map(operative => ({
            sourceId: operative.ID_FUENTE,
            operativeId: operative.ID_OPERATIVO,
            description: operative.DESCRIPCION,
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            arrivalDate: dateString(operative.FECHA_LLEGADA_OPERATIVO, 'YYYY-MM-DDTHH:mm:ss'),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            operatingContact: operative.CONTACTO_OPERATIVO,
            mailContact: operative.MAIL_CONTACTO,
            codingStartDate: dateString(operative.FECHA_INICIO_CODIFICACION, 'YYYY-MM-DDTHH:mm:ss'),
            codingEndDate: dateString(operative.FECHA_FIN_CODIFICACION, 'YYYY-MM-DDTHH:mm:ss'),
            deliveryStartDate: dateString(operative.FECHA_INICIO_ENTREGA, 'YYYY-MM-DDTHH:mm:ss'),
            deletedStartDate: dateString(operative.FECHA_INICIO_BORRADO, 'YYYY-MM-DDTHH:mm:ss'),
            deletedEndDate: dateString(operative.FECHA_FIN_BORRADO, 'YYYY-MM-DDTHH:mm:ss'),
            qualityOperational: operative.CALIDAD_TOTAL_OPERATIVO,
            operatingErrorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userCreator: operative.ID_USUARIO_ALTA,
            userDeleted: operative.ID_USUARIO_BAJA,
            createdAt: dateString(operative.FECHA_ALTA, 'YYYY-MM-DD'),
            deletedAt: dateString(operative.FECHA_BAJA, 'YYYY-MM-DD')
        }));
    }

    static async update(params, ids){
        const formattedOperative = {
            ID_FUENTE: params.sourceId,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            FECHA_LLEGADA_OPERATIVO: stringDate(params.arrivalDate, 'YYYY-MM-DDTHH:mm:ss'),
            CONTACTO_OPERATIVO: params.operatingContact,
            MAIL_CONTACTO: params.mailContact
        };
        const formattedFilters = {ID_OPERATIVO: ids.operativeId};
        const operativeId = await operatives.updateOne(formattedFilters, formattedOperative, ['ID_OPERATIVO']);
        const operative = await OperativesService.findOne({operativeId});
        return operative;
    }

    static async delete(filters, userDeleted){
        const success = await operatives.deleteOne({ID_OPERATIVO: filters.operativeId}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getOperativesData(resources){
        const operativesIds = uniq(map(resources, resource => resource.operativeId));
        let operativesData = await operatives.findByValues('ID_OPERATIVO', operativesIds);
        operativesData = map(operativesData, operative => ({
            id: operative.ID_OPERATIVO,
            sourceId: operative.ID_FUENTE,
            description: operative.DESCRIPCION
        }));
        await OperativeSourcesService.getSourceOperativeData(operativesData);
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.operative = find(operativesData, operative => operative.id === resource.operativeId);
            return resource;
        });
    }

    static async getTotal({ search }) {
        const { total } = await operatives.countTotal({FECHA_BAJA: null}, search, ['DESCRIPCION']);
        return total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = operatives.knex.select(columns)
                .from(operatives.tableName)
                .where({FECHA_BAJA: null})
                .stream();
            stream.on('error', function(err) {
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
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }

    static getColumns(){
        return [
            {
                original: 'ID_FUENTE',
                modified: 'FUENTE ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'FECHA_LLEGADA_OPERATIVO',
                modified: 'FECHA LLEGADA DEL OPERATIVO'
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
                original: 'CONTACTO_OPERATIVO',
                modified: 'CONTACTO OPERATIVO'
            },
            {
                original: 'MAIL_CONTACTO',
                modified: 'MAIL CONTACTO'
            }
        ];
    }
}

module.exports = OperativesService;
