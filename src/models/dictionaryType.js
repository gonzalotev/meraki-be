const ModelCreate = include('helpers/modelCreate');
const {dictionaryTypeAttrib, dictionaryTypeTableName} = include('constants');
const name = 'dictionaryType';

class DictionaryType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: dictionaryTypeAttrib,
            tableName: dictionaryTypeTableName
        });
    }
    getDictionariesTypes(ids){
        return this.knex.select({
            id: 'ID_TIPOLOGIA_DE_DICCIONARIO',
            description: 'DESCRIPCION'
        })
            .from(this.tableName)
            .whereIn('ID_TIPOLOGIA_DE_DICCIONARIO', ids)
            .timeout(this.timeout);
    }
}

module.exports = knex => new DictionaryType({ knex });
