const ModelCreate = include('/helpers/modelCreate');
const {nomenclatorsTableName, nomenclatorsAttrib} = include('constants');
const name = 'Nomenclators';

class Nomenclators extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: nomenclatorsTableName,
            selectableProps: nomenclatorsAttrib
        });
    }
}

module.exports = knex => new Nomenclators({knex});
