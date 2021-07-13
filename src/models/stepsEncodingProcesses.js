const ModelCreate = include('helpers/modelCreate');
const {stepsEncodingProcessesTableName, stepsEncodingProcessesAttrib} = include('constants');
const name = 'stepsEncodingProcesses';

class StepsEncodingProcesses extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: stepsEncodingProcessesTableName,
            selectableProps: stepsEncodingProcessesAttrib
        });
    }
}

module.exports = knex => new StepsEncodingProcesses({knex});
