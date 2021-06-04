const ModelCreate = include('helpers/modelCreate');
const {assignmentRoleOperativeVariableAttrib, assignmentRoleOperativeVariableTableName} = include('constants');
const name = 'assignmentRolesOperativeVariable';

class AssignmentRolesOperativeVariable extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: assignmentRoleOperativeVariableAttrib,
            tableName: assignmentRoleOperativeVariableTableName
        });
    }
}

module.exports = knex => new AssignmentRolesOperativeVariable({ knex });
