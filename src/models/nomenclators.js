const ModelCreate = include('/helpers/modelCreate');
const name = 'Nomenclators';
const tableName = 'NOMENCLADORES';
const selectableProps = {
    id: 'ID_NOMENCLADOR',
    initial: 'SIGLA',
    shortDescription: 'DESCRIPCION_ABREVIADA',
    longDescription: 'DESCRIPCION_COMPLETA'
};

const handleProps = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_FIN_PUBLICACION',
    userCreator: 'ID_USUARIO'
};

class Nomenclators extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName,
            name,
            selectableProps,
            handleProps
        });
    }
}

module.exports = knex => new Nomenclators({knex});
