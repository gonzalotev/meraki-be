const ModelCreate = include('/helpers/modelCreate');
const {lotsAttrib, datesWithUserAttrib, lotsTableName} = include('constants');
const name = 'lots';

class Lots extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName: lotsTableName,
            name,
            selectableProps: lotsAttrib,
            handleProps: datesWithUserAttrib
        });
    }
}

module.exports = knex => new Lots({knex});
