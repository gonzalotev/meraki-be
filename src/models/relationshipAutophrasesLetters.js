const ModelCreate = include('helpers/modelCreate');
const {relationshipAutoPhraseLetterAttrib, relationshipAutoPhraseLetterTableName} = include('constants');
const name = 'relationshipAutophrasesLetter';

class RelationshipAutophrasesLetters extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: relationshipAutoPhraseLetterAttrib,
            tableName: relationshipAutoPhraseLetterTableName
        });
    }
}

module.exports = knex => new RelationshipAutophrasesLetters({ knex });
