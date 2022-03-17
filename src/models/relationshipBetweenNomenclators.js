const ModelCreate = include('helpers/modelCreate');
const {relationshipBetweenNomenclatorsTableName, relationshipBetweenNomenclatorsAttrib} = include('constants');
const name = 'wordsDictionary';

class RelationshipBetweenNomenclators extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: relationshipBetweenNomenclatorsTableName,
            selectableProps: relationshipBetweenNomenclatorsAttrib
        });
    }
}

module.exports = knex => new RelationshipBetweenNomenclators({knex});
