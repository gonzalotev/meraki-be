const { ticket: ticketModel } = include('models');
const TicketTypeService = require('./ticketType');
const { dateToString, dateTimeToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class ticketService {
    static async fetch(query, userId) {
        let ticketsTypes = await ticketModel.findByPage(
            query.page,
            {ID_USUARIO_ALTA: userId},
            ticketModel.selectableProps,
            [{ column: 'ID_CHAT', order: 'asc' }]
        );
        ticketsTypes = ticketsTypes.map(ticket => ({
            id: ticket.ID_CHAT,
            originTable: ticket.TABLA_ORIGEN,
            originChatText: ticket.TEXTO_CHAT_ORIGEN,
            createdAt: dateToString(ticket.FECHA_ALTA),
            userCreator: ticket.ID_USUARIO_ALTA,
            userReponsableId: ticket.ID_USUARIO_RESPONSABLE,
            solutionText: ticket.TEXTO_SOLUCION,
            solutionUserId: ticket.ID_USUARIO_SOLUCION,
            ticketTypeId: ticket.ID_TIPO_CHAT,
            solutionDate: dateToString(ticket.FECHA_SOLUCION),
            aproved: ticket.SOLUCIONADO_SI_NO,
            userName: ticket.USUARIO
        }));

        await TicketTypeService.getTicketTypeData(ticketsTypes);
        return ticketsTypes;
    }
    static async getTotal(filters) {
        const total = await ticketModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async create(params, userCreator) {
        const formattedticket = {
            ID_CHAT: null,
            TABLA_ORIGEN: trim(params.originTable),
            TEXTO_CHAT_ORIGEN: trim(params.originChatText),
            FECHA_ALTA: new Date(),
            ID_USUARIO_ALTA: userCreator.id,
            ID_USUARIO_RESPONSABLE: params.userReponsableId,
            TEXTO_SOLUCION: null,
            ID_USUARIO_SOLUCION: null,
            ID_TIPO_CHAT: params.ticketTypeId,
            FECHA_SOLUCION: null,
            SOLUCIONADO_SI_NO: false,
            USUARIO: trim(params.userName)
        };
        const ticketId = await ticketModel.insertOne(formattedticket, ['ID_CHAT']);
        const ticket = await ticketService.findOne({id: ticketId});
        return ticket;

    }

    static async findOne(filters) {
        const ticket = await ticketModel.findById({
            ID_CHAT: filters.id
        });
        return {
            id: ticket.ID_CHAT,
            originTable: ticket.TABLA_ORIGEN,
            originChatText: ticket.TEXTO_CHAT_ORIGEN,
            createdAt: dateTimeToString(ticket.FECHA_ALTA),
            userCreator: ticket.ID_USUARIO_ALTA,
            userReponsableId: ticket.ID_USUARIO_RESPONSABLE,
            solutionText: ticket.TEXTO_SOLUCION,
            solutionUserId: ticket.ID_USUARIO_SOLUCION,
            ticketTypeId: ticket.ID_TIPO_CHAT,
            solutionDate: dateTimeToString(ticket.FECHA_SOLUCION),
            aproved: !!ticket.SOLUCIONADO_SI_NO,
            userName: ticket.USUARIO
        };
    }

    static async update(filters, params, userCreator) {
        const formattedticket = {
            ID_CHAT: params.id,
            TABLA_ORIGEN: trim(params.originTable),
            TEXTO_CHAT_ORIGEN: trim(params.originChatText),
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_RESPONSABLE: params.userResponsableId,
            TEXTO_SOLUCION: params.solutionText,
            ID_USUARIO_SOLUCION: userCreator,
            ID_TIPO_CHAT: params.ticketTypeId,
            FECHA_SOLUCION: stringToDate(params.solutionDate),
            SOLUCIONADO_SI_NO: params.aproved,
            USUARIO: trim(params.userName)
        };
        const ticketId = await ticketModel.updateOne({ ID_CHAT: filters.id }, formattedticket, ['ID_CHAT']);
        const ticket = await ticketService.findOne({id: ticketId});
        return ticket;
    }
}

module.exports = ticketService;
