const ModelCreate = include('helpers/modelCreate');
const {relationTypeTableName, relationTypeAttrib} = include('constants');
const name = 'relationType';

class RelationType extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: relationTypeTableName,
            selectableProps: relationTypeAttrib
        });
    }
}

module.exports = knex => new RelationType({knex});
