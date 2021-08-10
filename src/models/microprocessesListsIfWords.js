const ModelCreate = include('helpers/modelCreate');
const { microprocessesListsIfWordsAttrib, microprocessesListsIfWordsTableName } = include('constants');
const name = 'microprocessesListsIfWords';

class MicroprocessesListsIfWord extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: microprocessesListsIfWordsAttrib,
            tableName: microprocessesListsIfWordsTableName
        });
    }
}

module.exports = knex => new MicroprocessesListsIfWord({ knex });  