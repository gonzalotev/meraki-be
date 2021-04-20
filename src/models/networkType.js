const ModelCreate = include('helpers/modelCreate');
const {networkTypeAttrib, networkTypeTableName} = include('constants');
const name = 'networkType';

class NetworkType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: networkTypeAttrib,
            tableName: networkTypeTableName
        });
    }
}

module.exports = knex => new NetworkType({ knex });
