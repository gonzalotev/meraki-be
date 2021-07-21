const ModelCreate = include('helpers/modelCreate');
const { encodingProcessesAttrib, encodingProcessesTableName } = include('constants');
const name = 'encodingProcesses';

class EncodingProcess extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: encodingProcessesAttrib,
            tableName: encodingProcessesTableName
        });
    }
}

module.exports = knex => new EncodingProcess({ knex });
