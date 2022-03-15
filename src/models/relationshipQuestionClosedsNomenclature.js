const ModelCreate = include('helpers/modelCreate');
const {relationshipQuestionClosedNomenclatureAttrib, relationshipQuestionClosedNomenclatureTableName} = include('constants');
const name = 'relationshipQuestionClosedsNomenclature';

class SpecialPhraseType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: relationshipQuestionClosedNomenclatureAttrib,
            tableName: relationshipQuestionClosedNomenclatureTableName
        });
    }
}

module.exports = knex => new SpecialPhraseType({ knex });
