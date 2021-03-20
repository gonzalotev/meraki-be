const ModelCreate = include('helpers/modelCreate');
const name = 'Role';
const tableName = 'TIPOS_DE_ROLES';
const selectableProps = {
    id: 'ID_ROL_USUARIO',
    description: 'DESCRIPCION',
    observation: 'OBSERVACION',
    domain: 'DOMINIO'
};
const handleProps = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA',
    userCreator: 'ID_USUARIO_ALTA',
    userDestroyer: 'ID_USUARIO_BAJA'
};

class RoleType extends ModelCreate {
    constructor(props) {
        super({ ...props, name, tableName, selectableProps, handleProps });
    }
}

module.exports = knex => new RoleType({ knex });
