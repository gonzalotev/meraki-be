const ModelCreate = include('helpers/modelCreate');
const {relationshipQuestionClosedLetterAttrib, relationshipQuestionClosedLetterTableName} = include('constants');
const name = 'relationshipQuestionClosedsLetter';

class RelationshipQuestionClosedsLetters extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: relationshipQuestionClosedLetterAttrib,
            tableName: relationshipQuestionClosedLetterTableName
        });
    }
}

module.exports = knex => new RelationshipQuestionClosedsLetters({ knex });
