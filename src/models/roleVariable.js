const ModelCreate = include('/helpers/modelCreate');
const {
    assignmentRoleOperativeVariableTableName,
    assignmentRoleOperativeVariableAttrib
} = include('constants');
const name = 'roleVariable';

class RoleVariable extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            selectableProps: assignmentRoleOperativeVariableAttrib,
            tableName: assignmentRoleOperativeVariableTableName
        });
    }
}

module.exports = knex => new RoleVariable({knex});
