const ModelCreate = include('helpers/modelCreate');
const {operativeSourcesTableName, operativeSourcesAttrib} = include('constants');
const name = 'wordsDictionary';

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
