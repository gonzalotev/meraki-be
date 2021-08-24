const ModelCreate = include('helpers/modelCreate');
const {microprocessesOptionTablename, microprocessesOptionAttrib} = include('constants');
const name = 'microprocessesOption';

class MicroprocessesOption extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: microprocessesOptionAttrib,
            tableName: microprocessesOptionTablename
        });
    }
}

module.exports = knex => new MicroprocessesOption({ knex });
