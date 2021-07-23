const { ticketType: ticketTypeModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const toUpper = require('lodash/toUpper');
const uniq = require('lodash/uniq');
const find = require('lodash/find');

class TicketTypeService {
    static async fetch(query) {
        const ticketsTypes = await ticketTypeModel.findByPage(
            query.page,
            { FECHA_BAJA: null },
            ticketTypeModel.selectableProps,
            [{ column: 'ID_TIPO_CHAT', order: 'asc' }]
        );
        return ticketsTypes.map(ticketType => ({
            id: ticketType.ID_TIPO_CHAT,
            description: ticketType.DESCRIPCION,
            observation: ticketType.OBSERVACION,
            domain: ticketType.DOMINIO,
            approved: ticketType.SUPERVISADO,
            createdAt: dateToString(ticketType.FECHA_ALTA),
            userCreator: ticketType.ID_USUARIO_ALTA,
            userDeleted: ticketType.ID_USUARIO_BAJA,
            deletedAt: dateToString(ticketType.FECHA_BAJA)
        }));
    }
    static async getTotal(filters) {
        const total = await ticketTypeModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async create(params, userCreator) {
        const formattedTicketType = {
            ID_TIPO_CHAT: null,
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const ticketTypeId = await ticketTypeModel.insertOne(formattedTicketType, ['ID_TIPO_CHAT']);
        const ticketType = await TicketTypeService.findOne({id: ticketTypeId});
        return ticketType;

    }

    static async findOne(filters) {
        const ticketType = await ticketTypeModel.findById({
            ID_TIPO_CHAT: filters.id
        });
        return {
            id: ticketType.ID_TIPO_CHAT,
            description: ticketType.DESCRIPCION,
            observation: ticketType.OBSERVACION,
            domain: ticketType.DOMINIO,
            approved: ticketType.SUPERVISADO,
            createdAt: dateToString(ticketType.FECHA_ALTA),
            userCreator: ticketType.ID_USUARIO_ALTA,
            userDeleted: ticketType.ID_USUARIO_BAJA,
            deletedAt: dateToString(ticketType.FECHA_BAJA)
        };
    }

    static async update(filters, params) {
        const formattedTicketType = {
            ID_TIPO_CHAT: params.id,
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const ticketTypeId = await ticketTypeModel.updateOne({ ID_TIPO_CHAT: filters.id },
            formattedTicketType, ['ID_TIPO_CHAT']);
        const ticketType = await TicketTypeService.findOne({id: ticketTypeId});
        return ticketType;
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_TIPO_CHAT: filters.id };
        const success = await ticketTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getTicketTypeData(resources){
        const ticketTypeIds = uniq(map(resources, resource => resource.ticketTypeId));
        let ticketTypeData = await ticketTypeModel.findByValues('ID_TIPO_CHAT', ticketTypeIds);
        ticketTypeData = map(ticketTypeData, ticketType => ({
            id: ticketType.ID_TIPO_CHAT,
            description: ticketType.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.ticketType = find(ticketTypeData,
                ticketType => ticketType.id === resource.ticketTypeId);
            return resource;
        });
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_TIPO_CHAT',
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
            const stream = ticketTypeModel.knex.select(tableHeaders)
                .from(ticketTypeModel.tableName)
                .orderBy([{column: 'ID_TIPO_CHAT', order: 'asc'}])
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

module.exports = TicketTypeService;
