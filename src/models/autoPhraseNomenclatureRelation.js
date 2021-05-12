const ModelCreate = include('helpers/modelCreate');
const {autoPhraseNomenclatureRelationTableName, autoPhraseNomenclatureRelationAttrib} = include('constants');
const name = 'AutoPhraseNomenclatureRelation';

class AutoPhraseNomenclatureRelation extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            tableName: autoPhraseNomenclatureRelationTableName,
            selectableProps: autoPhraseNomenclatureRelationAttrib
        });
    }
}

module.exports = knex => new AutoPhraseNomenclatureRelation({knex});
