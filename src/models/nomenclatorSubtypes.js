const ModelCreate = include('helpers/modelCreate');
const {nomenclatorSubtypeTableName, nomenclatorSubtypeAttrib} = include('constants');
const name = 'nomenclatorSubtypes';

class NetType extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: nomenclatorSubtypeTableName,
            selectableProps: nomenclatorSubtypeAttrib
        });
    }
}

module.exports = knex => new NetType({knex});
