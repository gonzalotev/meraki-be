const ModelCreate = include('helpers/modelCreate');
const {operativeSourcesTableName, operativeSourcesAttrib} = include('constants');
const name = 'operativeSources';

class OperativeSources extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: operativeSourcesTableName,
            selectableProps: operativeSourcesAttrib
        });
    }
}

module.exports = knex => new OperativeSources({knex});
