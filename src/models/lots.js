const ModelCreate = include('/helpers/modelCreate');
const name = 'Lots';
const tableName = 'LOTES';
const selectableProps = {
    operativId: 'ID_OPERATIVO',
    lotId: 'ID_LOTE',
    description: 'DESCRIPCION'
};
const handleProps = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_FIN_BORRADO',
    userCreator: 'ID_USUARIO'
};
class Lots extends ModelCreate{
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

module.exports = knex => new Lots({knex});
