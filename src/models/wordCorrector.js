const ModelCreate = include('helpers/modelCreate');
const {wordCorrectorAttrib, wordCorrectorTableName} = include('constants');
const name = 'wordCorrector';

class WordCorrector extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: wordCorrectorAttrib,
            tableName: wordCorrectorTableName
        });
    }
}

module.exports = knex => new WordCorrector({ knex });
