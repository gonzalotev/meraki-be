const ModelCreate = include('helpers/modelCreate');
const {operativeStructureAttrib, operativeStructureTableName} = include('constants');
const name = 'OperativeStructure';

class OperativeStructure extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: operativeStructureAttrib,
            tableName: operativeStructureTableName
        });
    }
}

module.exports = knex => new OperativeStructure({ knex });
