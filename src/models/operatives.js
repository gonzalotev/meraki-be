const ModelCreate = include('helpers/modelCreate');
const { operativesAttrib, operativesTableName } = include('constants');
const name = 'operatives';

class Operatives extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName: operativesTableName,
            name,
            selectableProps: operativesAttrib
        });
    }
}

module.exports = knex => new Operatives({knex});
