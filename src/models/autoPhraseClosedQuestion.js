const ModelCreate = include('helpers/modelCreate');
const {autoPhraseClosedQuestionTableName, autoPhraseClosedQuestionAttrib} = include('constants');
const name = 'AutoPhraseClosedQuestion';

class AutoPhraseClosedQuestionModel extends ModelCreate {
    constructor(props){
        super({
            ...props,
            name,
            selectableProps: autoPhraseClosedQuestionAttrib,
            tableName: autoPhraseClosedQuestionTableName
        });
    }
}

module.exports = knex => new AutoPhraseClosedQuestionModel({knex});
