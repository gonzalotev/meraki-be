const ModelCreate = include('helpers/modelCreate');
const {stepsLinguisticProcessesTableName, stepsLinguisticProcessesAttrib} = include('constants');
const name = 'stepsLinguisticProcesses';

class StepsLinguisticProcesses extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: stepsLinguisticProcessesTableName,
            selectableProps: stepsLinguisticProcessesAttrib
        });
    }
}

module.exports = knex => new StepsLinguisticProcesses({knex});
