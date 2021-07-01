const ModelCreate = include('/helpers/modelCreate');
const {nomenclaturesTableName, nomenclaturesAttrib} = include('constants');
const name = 'Nomenclatures';

class Nomenclatures extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: nomenclaturesTableName,
            selectableProps: nomenclaturesAttrib
        });
    }
}

module.exports = knex => new Nomenclatures({knex});
