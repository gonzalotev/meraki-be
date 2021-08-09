const ModelCreate = include('helpers/modelCreate');
const {microprocessesListIfTablename, microprocessesListIfAttrib} = include('constants');
const name = 'microprocessesListIf';

class MicroprocessesListIf extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: microprocessesListIfAttrib,
            tableName: microprocessesListIfTablename
        });
    }
}

module.exports = knex => new MicroprocessesListIf({ knex });
