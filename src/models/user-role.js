const ModelCreate = include('/helpers/modelCreate');
const name = 'UserRole';
const tableName = 'ROLES_SICI';
const selectableProps = {
    userId: 'ID_USUARIO',
    roleId: 'ID_ROL_USUARIO',
    description: 'DESCRIPCION',
    domain: 'DOMINIO',
    observation: 'OBSERVACION',
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA'
};

class UserRole extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName,
            name,
            selectableProps
        });
    }
}

module.exports = knex => new UserRole({knex});
