const { ticketType: ticketTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const toUpper = require('lodash/toUpper');
const uniq = require('lodash/uniq');
const find = require('lodash/find');

class TicketTypeService {
    static async fetch(query) {
        const ticketsTypes = await ticketTypeModel.findByPage(
            query.page,
            {},
            ticketTypeModel.selectableProps
            // [{ column: 'FECHA_BAJA', order: 'asc' }]
        );
        return ticketsTypes.map(ticketType => ({
            id: ticketType.ID_TIPO_CHAT,
            description: ticketType.DESCRIPCION,
            observation: ticketType.OBSERVACION,
            domain: ticketType.DOMINIO,
            approved: ticketType.SUPERVISADO,
            createdAt: dateToString(ticketType.FECHA_ALTA),
            userCreator: ticketType.ID_USUARIO_ALTA
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
            userCreator: ticketType.ID_USUARIO_ALTA
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
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const ticketTypeId = await ticketTypeModel.updateOne({ ID_TIPO_CHAT: filters.id },
            formattedTicketType, ['ID_TIPO_CHAT']);
        const ticketType = await TicketTypeService.findOne({id: ticketTypeId});
        return ticketType;
    }

    static delete(ticketTypeId) {
        return ticketTypeModel.deleteOne({ID_TIPO_CHAT: ticketTypeId});
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

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = ticketTypeModel.knex.select(columns)
                .from(ticketTypeModel.tableName)
                .where()
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
                original: 'ID_TIPO_CHAT',
                modified: 'TIPO TICKET ID'
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

module.exports = TicketTypeService;
