const ModelCreate = include('helpers/modelCreate');
const {microprocessesClosedQuestionIfTablename, microprocessesClosedQuestionIfAttrib} = include('constants');
const name = 'microprocessesClosedQuestionIf';

class MicroprocessesClosedQuestionIf extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: microprocessesClosedQuestionIfAttrib,
            tableName: microprocessesClosedQuestionIfTablename
        });
    }
}

module.exports = knex => new MicroprocessesClosedQuestionIf({ knex });
