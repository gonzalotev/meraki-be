const ModelCreate = include('helpers/modelCreate');
const {rolesTypeAttrib, rolesTypeTableName} = include('constants');
const name = 'roles';

class Roles extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            tableName: rolesTypeTableName,
            selectableProps: rolesTypeAttrib
        });
    }
}

module.exports = knex => new Roles({ knex });
