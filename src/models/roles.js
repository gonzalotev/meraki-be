const ModelCreate = include('helpers/modelCreate');
const {rolesTableName, rolesAttrib} = include('constants');
const name = 'roles';

class Roles extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            tableName: rolesTableName,
            selectableProps: rolesAttrib
        });
    }
}

module.exports = knex => new Roles({ knex });
