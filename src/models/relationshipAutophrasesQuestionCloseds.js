const ModelCreate = include('helpers/modelCreate');
const {relationshipAutophrasesQuestionClosedsAttrib, relationshipAutophrasesQuestionClosedsTableName} = include('constants');
const name = 'relationshipAutophraseQuestionClosed';

class RelationshipAutophraseQuestionClosed extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: relationshipAutophrasesQuestionClosedsAttrib,
            tableName: relationshipAutophrasesQuestionClosedsTableName
        });
    }
}

module.exports = knex => new RelationshipAutophraseQuestionClosed({ knex });
