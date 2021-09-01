const ModelCreate = include('helpers/modelCreate');
const { microprocessesWordsAttrib, microprocessesWordsTableName } = include('constants');
const name = 'microprocessesWords';

class MicroprocessesWord extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: microprocessesWordsAttrib,
            tableName: microprocessesWordsTableName
        });
    }
}

module.exports = knex => new MicroprocessesWord({ knex });
