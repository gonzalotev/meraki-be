const ModelCreate = include('/helpers/modelCreate');
const {lotsAttrib, lotsTableName} = include('constants');
const name = 'lots';

class Lots extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: lotsTableName,
            selectableProps: lotsAttrib
        });
    }
}

module.exports = knex => new Lots({knex});
