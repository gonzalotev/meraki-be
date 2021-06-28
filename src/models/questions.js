const ModelCreate = include('helpers/modelCreate');
const {questionsAttrib, questionsTableName} = include('constants');
const name = 'questions';

class Question extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: questionsAttrib,
            tableName: questionsTableName
        });
    }
}

module.exports = knex => new Question({ knex });
