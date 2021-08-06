const ModelCreate = include('/helpers/modelCreate');
const {nomenclatorsGroupingsTableName, nomenclatorsGroupingsAttrib} = include('constants');
const name = 'NomenclatorsGroupings';

class NomenclatorsGroupings extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: nomenclatorsGroupingsTableName,
            selectableProps: nomenclatorsGroupingsAttrib
        });
    }
}

module.exports = knex => new NomenclatorsGroupings({knex});
