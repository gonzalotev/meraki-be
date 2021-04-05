const ModelCreate = include('helpers/modelCreate');
const {netTypeTableName, netTypeAttrib} = include('constants');
const name = 'netType';

class NetType extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: netTypeTableName,
            selectableProps: netTypeAttrib
        });
    }
}

module.exports = knex => new NetType({knex});
