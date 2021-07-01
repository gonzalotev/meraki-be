const ModelCreate = include('/helpers/modelCreate');
const {operativeFontsTableName, operativeFontsAttrib} = include('constants');
const name = 'OperativeFonts';

class OperativeFonts extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: operativeFontsTableName,
            selectableProps: operativeFontsAttrib
        });
    }
}

module.exports = knex => new OperativeFonts({knex});
