const ModelCreate = include('/helpers/modelCreate');
const {editorsTableName, editorsAttrib} = include('constants');
const name = 'editors';

class Editors extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: editorsTableName,
            selectableProps: editorsAttrib
        });
    }
}

module.exports = knex => new Editors({knex});
