const ModelCreate = include('helpers/modelCreate');
const {sourceQuestionsRelationsAttrib, sourceQuestionsRelationsTableName} = include('constants');
const name = 'sourceQuestionRelation';

class SourceQuestionRelation extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: sourceQuestionsRelationsAttrib,
            tableName: sourceQuestionsRelationsTableName
        });
    }
}

module.exports = knex => new SourceQuestionRelation({ knex });
