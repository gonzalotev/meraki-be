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
    async findWords(words) {
        return await this.knex.select(['PALABRA'])
            .from(this.tableName)
            .whereIn('PALABRA', words)
            .pluck('PALABRA')
            .timeout(this.timeout);
    }
}

module.exports = knex => new WordsDictionary({knex});
