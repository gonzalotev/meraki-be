const ModelCreate = include('helpers/modelCreate');
const {dictionaryLinguisticAttrib, dictionaryLinguisticTableName} = include('constants');
const name = 'dictionaryLinguistic';

class DictionaryLinguistic extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: dictionaryLinguisticAttrib,
            tableName: dictionaryLinguisticTableName
        });
    }
}

module.exports = knex => new DictionaryLinguistic({ knex });
