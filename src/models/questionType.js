const ModelCreate = include('helpers/modelCreate');
const {questionTypeAttrib, questionTypeTableName} = include('constants');
const name = 'questionType';

class QuestionType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: questionTypeAttrib,
            tableName: questionTypeTableName
        });
    }
}

module.exports = knex => new QuestionType({ knex });
