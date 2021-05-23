const ModelCreate = include('helpers/modelCreate');
const {ticketTypeAttrib, ticketTypeTableName} = include('constants');
const name = 'ticketType';

class TicketType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: ticketTypeAttrib,
            tableName: ticketTypeTableName
        });
    }
}

module.exports = knex => new TicketType({ knex });
