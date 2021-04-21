const ModelCreate = include('helpers/modelCreate');
const {rolesTypeAttrib, rolesTypeTableName} = include('constants');
const name = 'rolesType';

class RolesType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: rolesTypeAttrib,
            tableName: rolesTypeTableName
        });
    }
}

module.exports = knex => new RolesType({ knex });
