const ModelCreate = include('helpers/modelCreate');
const {staticalVariableAttrib, staticalVariableTableName} = include('constants');
const name = 'staticalVariable';

class StaticalVariable extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: staticalVariableAttrib,
            tableName: staticalVariableTableName
        });
    }
}

module.exports = knex => new StaticalVariable({ knex });
