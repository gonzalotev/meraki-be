const ModelCreate = include('/helpers/modelCreate');
const {nomenclaturesGroupingsTableName, nomenclaturesGroupingsAttrib} = include('constants');
const name = 'NomenclaturesGroupings';

class NomenclaturesGroupings extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: nomenclaturesGroupingsTableName,
            selectableProps: nomenclaturesGroupingsAttrib
        });
    }
}

module.exports = knex => new NomenclaturesGroupings({knex});
