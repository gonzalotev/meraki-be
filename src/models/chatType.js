const ModelCreate = include('helpers/modelCreate');
const {chatTypeAttrib, chatTypeTableName} = include('constants');
const name = 'chatType';

class ChatType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: chatTypeAttrib,
            tableName: chatTypeTableName
        });
    }
}

module.exports = knex => new ChatType({ knex });
