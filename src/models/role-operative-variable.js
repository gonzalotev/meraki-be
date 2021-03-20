const ModelCreate = include('/helpers/modelCreate');
const name = 'RoleOperativeVariable';
const tableName = 'RELACION_ROLES_OPERATIVOS_VARIABLES';
const selectableProps = {
    userId: 'ID_USUARIO',
    roleId: 'ID_ROL_USUARIO',
    operativeId: 'ID_OPERATIVO',
    lotId: 'ID_LOTE',
    variableId: 'ID_VARIABLE',
    observation: 'OBSERVACION',
    domain: 'DOMINIO',
    aprroved: 'SI_NO'
};
const handleProps = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA'
};

class RoleOperativeVariable extends ModelCreate{
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

module.exports = knex => new RoleOperativeVariable({knex});
