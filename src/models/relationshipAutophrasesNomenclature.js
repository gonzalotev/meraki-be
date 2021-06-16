const ModelCreate = include('helpers/modelCreate');
const {relationshipAutoPhraseNomenclatureAttrib, relationshipAutoPhraseNomenclatureTableName} = include('constants');
const name = 'relationshipAutophrasesNomenclature';

class SpecialPhraseType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: relationshipAutoPhraseNomenclatureAttrib,
            tableName: relationshipAutoPhraseNomenclatureTableName
        });
    }
}

module.exports = knex => new SpecialPhraseType({ knex });
