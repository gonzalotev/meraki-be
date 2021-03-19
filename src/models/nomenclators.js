const ModelCreate = include('/helpers/modelCreate');
const name = 'Nomenclators';
const tableName = 'NOMENCLADORES';
const selectableProps = {
    id: 'ID_NOMENCLADOR',
    initial: 'SIGLA',
    shortDescription: 'DESCRIPCION_ABREVIADA',
    longDescription: 'DESCRIPCION_COMPLETA'
};

class Nomenclators extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName,
            name,
            selectableProps
        });
    }
}

module.exports = knex => new Nomenclators({knex});
