const ModelCreate = include('helpers/modelCreate');
const {newPhraseAttrib, newPhraseTableName} = include('constants');
const name = 'newPhrase';

class NewPhrase extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: newPhraseAttrib,
            tableName: newPhraseTableName
        });
    }
}

module.exports = knex => new NewPhrase({ knex });
