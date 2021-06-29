const toUpper = require('lodash/toUpper');
const { ticketType: ticketTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

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
        const ticketType = await ticketTypeModel.updateOne(
            { ID_TIPO_CHAT: filters.id },
            formattedTicketType
        );
        return {
            id: ticketType.ID_TIPO_CHAT,
            description: ticketType.DESCRIPCION,
            observation: ticketType.OBSERVACION,
            domain: ticketType.DOMINIO,
            approved: !!ticketType.SUPERVISADO,
            createdAt: dateToString(ticketType.FECHA_ALTA),
            userCreator: ticketType.ID_USUARIO_ALTA,
            userDeleted: ticketType.ID_USUARIO_BAJA,
            deletedAt: dateToString(ticketType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_TIPO_CHAT: filters.id };
        const success = await ticketTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = TicketTypeService;
