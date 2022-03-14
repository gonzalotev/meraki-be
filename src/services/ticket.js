const { ticket: ticketModel } = include('models');
const TicketTypeService = require('./ticketType');
const { dateToString, dateTimeToString, stringToDate } = include('util');
const knex = include('helpers/database');
const trim = require('lodash/trim');
const map = require('lodash/map');

class TicketService {
    static async fetch(query, userId) {
        let ticketsTypes = await ticketModel.findByPage(
            query.page,
            {ID_USUARIO_ALTA: userId, SOLUCIONADO_SI_NO: false, FECHA_BAJA_SOLUCIONADO: null},
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
            approved: ticket.SOLUCIONADO_SI_NO,
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
            TABLA_ORIGEN: trim(params.originTable),
            TABLA_RELACION: trim(params.relationshipTableName),
            TEXTO_CHAT_ORIGEN: trim(params.originChatText),
            FECHA_ALTA: new Date(),
            ID_USUARIO_ALTA: userCreator.id,
            ID_USUARIO_RESPONSABLE: params.userResponsableId,
            TEXTO_SOLUCION: null,
            ID_USUARIO_SOLUCION: null,
            ID_TIPO_CHAT: params.ticketTypeId,
            FECHA_SOLUCION: null,
            SOLUCIONADO_SI_NO: false,
            USUARIO: trim(params.userName),
            FECHA_BAJA_SOLUCIONADO: null,
            ID_USUARIO_BAJA: null
        };

        const transaction = await knex.transaction();
        const createdChat= await transaction('CHAT')
            .insert(formattedticket)
            .returning(ticketModel.selectableProps);
        //eslint-disable-next-line
        const createdRelation= await transaction(params.relationshipTableName)
            .insert({...params.relationshipData, ID_CHAT: createdChat[0].ID_CHAT});
        transaction.commit();
        return createdChat[0];
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
            userResponsableId: ticket.ID_USUARIO_RESPONSABLE,
            solutionText: ticket.TEXTO_SOLUCION,
            solutionUserId: ticket.ID_USUARIO_SOLUCION,
            ticketTypeId: ticket.ID_TIPO_CHAT,
            solutionDate: dateTimeToString(ticket.FECHA_SOLUCION),
            approved: !!ticket.SOLUCIONADO_SI_NO,
            userName: ticket.USUARIO,
            userDeleted: ticket.ID_USUARIO_BAJA,
            solutionDateDeleted: ticket.FECHA_BAJA_SOLUCIONADO
        };
    }

    static async update(filters, params, userCreator) {
        const formattedticket = {
            ID_CHAT: params.id,
            TABLA_ORIGEN: trim(params.originTable),
            TABLA_RELACION: trim(params.relationshipTableName),
            TEXTO_CHAT_ORIGEN: trim(params.originChatText),
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_RESPONSABLE: params.userResponsableId,
            TEXTO_SOLUCION: params.solutionText,
            ID_USUARIO_SOLUCION: userCreator,
            ID_TIPO_CHAT: params.ticketTypeId,
            FECHA_SOLUCION: stringToDate(params.solutionDate),
            SOLUCIONADO_SI_NO: params.approved,
            USUARIO: trim(params.userName),
            FECHA_BAJA_SOLUCIONADO: new Date()
        };
        const ticketId = await ticketModel.updateOne({ ID_CHAT: filters.id }, formattedticket, ['ID_CHAT']);
        const ticket = await TicketService.findOne({id: ticketId});
        return ticket;
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_CHAT: filters.id};
        const success = await ticketModel.deleteOne(formattedFilters, {
            FECHA_BAJA_SOLUCIONADO: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = ticketModel.knex.select(columns)
                .from(ticketModel.tableName)
                .where({FECHA_BAJA_SOLUCIONADO: null})
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function (data) {
                /* eslint-disable */
                const formattedData = map(data, function(value) {
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
                original: 'ID_CHAT',
                modified: 'TICKET ID'
            },
            {
                original: 'TABLA_ORIGEN',
                modified: 'TABLA ORIGEN'
            },
            {
                original: 'TABLA_RELACION',
                modified: 'TABLA RELACION'
            },
            {
                original: 'TEXTO_CHAT_ORIGEN',
                modified: 'TEXTO TICKET'
            },
            {
                original: 'TEXTO_SOLUCION',
                modified: 'SOLUCIÓN'
            },
            {
                original: 'USUARIO',
                modified: 'USUARIO'
            },
            {
                original: 'SOLUCIONADO_SI_NO',
                modified: 'SOLUCIONADO'
            },
            {
                original: 'FECHA_SOLUCION',
                modified: 'FECHA SOLUCIÓN'
            }
        ];
    }
}

module.exports = TicketService;
