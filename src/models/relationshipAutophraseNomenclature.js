const ModelCreate = include('helpers/modelCreate');
const {relationshipAutoPhraseNomenclaturesAttrib, relationshipAutoPhraseNomenclaturesTableName} = include('constants');
const name = 'relationshipNomenclature';

class RelationshipNomenclature extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: relationshipAutoPhraseNomenclaturesAttrib,
            tableName: relationshipAutoPhraseNomenclaturesTableName
        });
    }
}

module.exports = knex => new RelationshipNomenclature({ knex });
