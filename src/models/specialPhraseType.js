const ModelCreate = include('helpers/modelCreate');
const {specialPhraseTypeAttrib, specialPhraseTypeTableName} = include('constants');
const name = 'specialPhraseType';

class SpecialPhraseType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: specialPhraseTypeAttrib,
            tableName: specialPhraseTypeTableName
        });
    }
}

module.exports = knex => new SpecialPhraseType({ knex });
