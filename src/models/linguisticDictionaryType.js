const ModelCreate = include('helpers/modelCreate');
const {linguisticDictionaryTypeAttrib, linguisticDictionaryTypeTableName} = include('constants');
const name = 'linguisticDictionaryType';

class LinguisticDictionaryType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: linguisticDictionaryTypeAttrib,
            tableName: linguisticDictionaryTypeTableName
        });
    }
}

module.exports = knex => new LinguisticDictionaryType({ knex });
