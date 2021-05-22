const ModelCreate = include('helpers/modelCreate');
const {autoPhrasesAttrib, autoPhrasesTableName} = include('constants');
const name = 'autoPhrase';

class AutoPhrase extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: autoPhrasesAttrib,
            tableName: autoPhrasesTableName
        });
    }
}

module.exports = knex => new AutoPhrase({ knex });
