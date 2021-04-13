const ModelCreate = include('/helpers/modelCreate');
const {nomenclatorTypesTableName, nomenclatorTypesAttrib} = include('constants');
const name = 'nomenclatorTypes';

class NomenclatorTypes extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: nomenclatorTypesTableName,
            selectableProps: nomenclatorTypesAttrib
        });
    }
}

module.exports = knex => new NomenclatorTypes({knex});
