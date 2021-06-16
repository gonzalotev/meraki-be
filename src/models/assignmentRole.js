const ModelCreate = include('helpers/modelCreate');
const {rolesAttrib, rolesTableName} = include('constants');
const name = 'assignmentRole';

class AssignmentRole extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: rolesAttrib,
            tableName: rolesTableName
        });
    }
}

module.exports = knex => new AssignmentRole({ knex });
