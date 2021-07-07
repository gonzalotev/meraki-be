const ModelCreate = include('helpers/modelCreate');
const {lotsAttrib, lotsTableName} = include('constants');
const name = 'operativeLot';

class SpecialPhraseType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: lotsAttrib,
            tableName: lotsTableName
        });
    }
}

module.exports = knex => new SpecialPhraseType({ knex });
