const ModelCreate = include('/helpers/modelCreate');
const {assignmentRolesTableName, assignmentRolesAttrib} = include('constants');
const name = 'roleUser';

class RoleUser extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName: assignmentRolesTableName,
            name,
            selectableProps: assignmentRolesAttrib
        });
    }
}

module.exports = knex => new RoleUser({knex});
