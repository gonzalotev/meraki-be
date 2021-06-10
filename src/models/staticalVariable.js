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
    getVariables(ids){
        return this.knex.select({
            id: 'ID_VARIABLE',
            name: 'NOMBRE',
            abbreviation: 'ABREVIATURA'
        })
            .from(this.tableName)
            .whereIn('ID_VARIABLE', ids)
            .timeout(this.timeout);
    }
}

module.exports = knex => new StaticalVariable({ knex });
