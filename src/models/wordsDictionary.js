const ModelCreate = include('helpers/modelCreate');
const {wordsDictionaryTableName, wordsDictionaryAttrib} = include('constants');
const name = 'wordsDictionary';

class WordsDictionary extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: wordsDictionaryTableName,
            selectableProps: wordsDictionaryAttrib
        });
    }
}

module.exports = knex => new WordsDictionary({knex});
