const ModelCreate = include('helpers/modelCreate');
const {microprocessesStepsOptionTableName, microprocessesStepsOptionAttrib} = include('constants');
const name = 'microprocessesStepsOption';

class MicroprocessesStepsOption extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: microprocessesStepsOptionTableName,
            selectableProps: microprocessesStepsOptionAttrib
        });
    }
}

module.exports = knex => new MicroprocessesStepsOption({knex});
