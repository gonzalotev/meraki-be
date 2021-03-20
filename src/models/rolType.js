const ModelCreate = include('helpers/modelCreate');
const {roleTypeAttrib, roleTypeTableName} = include('constants');
const name = 'RoleType';

class RoleType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: roleTypeAttrib,
            tableName: roleTypeTableName
        });
    }
}

module.exports = knex => new RoleType({ knex });
