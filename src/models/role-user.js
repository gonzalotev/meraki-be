const ModelCreate = include('/helpers/modelCreate');
const name = 'RoleUser';
const tableName = 'ROLES_SICI';
const selectableProps = {
    userId: 'ID_USUARIO',
    roleId: 'ID_ROL_USUARIO',
    description: 'DESCRIPCION',
    domain: 'DOMINIO',
    observation: 'OBSERVACION'
};
const handleProps = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA'
};

class RoleUser extends ModelCreate{
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

module.exports = knex => new RoleUser({knex});
