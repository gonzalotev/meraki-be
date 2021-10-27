const ModelCreate = include('helpers/modelCreate');
const {runEncodingProcessesTableName, runEncodingProcessesAttrib} = include('constants');
const name = 'runEncodingProcesses';

class RunEncodingProcesses extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: runEncodingProcessesTableName,
            selectableProps: runEncodingProcessesAttrib
        });
    }
}

module.exports = knex => new RunEncodingProcesses({knex});
