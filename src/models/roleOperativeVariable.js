const ModelCreate = include('/helpers/modelCreate');
const {
    assignmentRoleOperativeVariableTableName,
    assignmentRoleOperativeVariableAttrib
} = include('constants');
const name = 'roleOperativeVariable';

class StatisticalVariable extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            selectableProps: assignmentRoleOperativeVariableAttrib,
            tableName: assignmentRoleOperativeVariableTableName
        });
    }
}

module.exports = knex => new StatisticalVariable({knex});
