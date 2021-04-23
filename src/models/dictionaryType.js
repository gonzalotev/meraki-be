const ModelCreate = include('helpers/modelCreate');
const {dictionaryTypeAttrib, dictionaryTypeTableName} = include('constants');
const name = 'dictionaryType';

class DictionaryType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: dictionaryTypeAttrib,
            tableName: dictionaryTypeTableName
        });
    }
}

module.exports = knex => new DictionaryType({ knex });
