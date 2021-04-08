const ModelCreate = include('/helpers/modelCreate');
const {staticalVariableAttrib, staticalVariableTableName} = include('constants');
const name = 'statisticalVariable';

class StatisticalVariable extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            selectableProps: staticalVariableAttrib,
            tableName: staticalVariableTableName
        });
    }
}

module.exports = knex => new StatisticalVariable({knex});
