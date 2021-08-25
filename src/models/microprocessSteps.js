const { microprocessStepsTableName, microprocessStepsAttrib } = include('constants');
const ModelCreate = include('helpers/modelCreate');

class MicroprocessSteps extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            tableName: microprocessStepsTableName,
            selectableProps: microprocessStepsAttrib,
            name: 'MicroprocessSteps'
        });
    }
}

module.exports = knex => new MicroprocessSteps({ knex });
