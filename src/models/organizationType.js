const ModelCreate = include('helpers/modelCreate');
const {organizationTypeAttrib, organizationTypeTableName} = include('constants');
const name = 'organizationType';

class OrganizationType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: organizationTypeAttrib,
            tableName: organizationTypeTableName
        });
    }
}

module.exports = knex => new OrganizationType({ knex });
