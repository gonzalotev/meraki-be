const ModelCreate = include('helpers/modelCreate');
const {relationTypeAttrib, relationTypeTableName} = include('constants');
const name = 'relationshipType';

class SpecialPhraseType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: relationTypeAttrib,
            tableName: relationTypeTableName
        });
    }
}

module.exports = knex => new SpecialPhraseType({ knex });
