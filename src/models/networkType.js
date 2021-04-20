const ModelCreate = include('helpers/modelCreate');
const {networkTypesAttrib, networkTypesTableName} = include('constants');
const name = 'networkType';

class NetworkType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: networkTypesAttrib,
            tableName: networkTypesTableName
        });
    }
}

module.exports = knex => new NetworkType({ knex });
