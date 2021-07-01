const ModelCreate = include('helpers/modelCreate');
const {operativesTableName, operativesAttrib} = include('constants');
const name = 'operatives';

class Operatives extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: operativesTableName,
            selectableProps: operativesAttrib
        });
    }
}

module.exports = knex => new Operatives({knex});
