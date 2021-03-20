const ModelCreate = include('/helpers/modelCreate');
const {staticalVariableAttrib, datesAttrib, staticalVariableTableName} = include('constants');
const name = 'StatisticsVariable';

class StatisticsVariable extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName: staticalVariableTableName,
            name,
            selectableProps: staticalVariableAttrib,
            handleProps: datesAttrib
        });
    }
}

module.exports = knex => new StatisticsVariable({knex});
