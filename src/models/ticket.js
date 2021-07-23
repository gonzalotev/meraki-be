const ModelCreate = include('helpers/modelCreate');
const {chatTableName, chatAttrib} = include('constants');
const name = 'ticket';

class Ticket extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: chatAttrib,
            tableName: chatTableName
        });
    }
}

module.exports = knex => new Ticket({ knex });
