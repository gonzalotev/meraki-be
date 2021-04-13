const ModelCreate = include('helpers/modelCreate');
const {relationTypeTableName, relationTypeAttrib} = include('constants');
const name = 'relationshipType';

class RelationshipType extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: relationTypeTableName,
            selectableProps: relationTypeAttrib
        });
    }
}

module.exports = knex => new RelationshipType({knex});
