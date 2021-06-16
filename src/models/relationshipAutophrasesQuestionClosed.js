const ModelCreate = include('helpers/modelCreate');
const {relationshipAutophrasesQuestionClosedsAttrib, relationshipAutophrasesQuestionClosedsTableName} = include('constants');
const name = 'relationshipAutophrasesQuestionClosed';

class SpecialPhraseType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: relationshipAutophrasesQuestionClosedsAttrib,
            tableName: relationshipAutophrasesQuestionClosedsTableName
        });
    }
}

module.exports = knex => new SpecialPhraseType({ knex });
