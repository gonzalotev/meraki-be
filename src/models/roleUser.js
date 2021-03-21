const ModelCreate = include('/helpers/modelCreate');
const {datesAttrib, assignmentRolesTableName, assignmentRolesAttrib} = include('constants');
const name = 'roleUser';

class RoleUser extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName: assignmentRolesTableName,
            name,
            selectableProps: assignmentRolesAttrib,
            handleProps: datesAttrib
        });
    }
}

module.exports = knex => new RoleUser({knex});
