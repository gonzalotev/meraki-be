const ModelCreate = include('helpers/modelCreate');
const {newWordAttrib, newWordTableName} = include('constants');
const name = 'newWord';

class NewWord extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: newWordAttrib,
            tableName: newWordTableName
        });
    }
}

module.exports = knex => new NewWord({ knex });
