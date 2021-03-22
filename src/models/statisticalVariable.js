const ModelCreate = include('/helpers/modelCreate');
const {assignmentStaticalVariableAttrib, assignmentStaticalVariableTableName} = include('constants');
const name = 'statisticalVariable';

class StatisticalVariable extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            selectableProps: assignmentStaticalVariableAttrib,
            tableName: assignmentStaticalVariableTableName
        });
    }
}

module.exports = knex => new StatisticalVariable({knex});
