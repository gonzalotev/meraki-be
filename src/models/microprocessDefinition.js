const ModelCreate = include('helpers/modelCreate');
const {microprocessDefinitionAttrib, microprocessDefinitionTableName} = include('constants');
const name = 'MicroprocessDefinition';

class MicroprocessDefinition extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: microprocessDefinitionAttrib,
            tableName: microprocessDefinitionTableName
        });
    }
}

module.exports = knex => new MicroprocessDefinition({ knex });
