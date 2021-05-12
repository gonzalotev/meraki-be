const ModelCreate = include('helpers/modelCreate');
const {autoPhrasesTableName, autoPhrasesAttrib} = include('constants');
const name = 'AutoPhrases';

class AutoPhrasesModel extends ModelCreate {
    constructor(props){
        super({
            ...props,
            name,
            selectableProps: autoPhrasesAttrib,
            tableName: autoPhrasesTableName
        });
    }
}

module.exports = knex => new AutoPhrasesModel({knex});
