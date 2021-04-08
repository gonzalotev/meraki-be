const ModelCreate = include('helpers/modelCreate');
const {dictionaryTypeTableName, dictionaryTypeAttrib} = include('constants');
const name = 'dictionaryType';

class DictionaryType extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: dictionaryTypeTableName,
            selectableProps: dictionaryTypeAttrib
        });
    }
}

module.exports = knex => new DictionaryType({knex});
