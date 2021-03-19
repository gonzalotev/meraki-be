const ModelCreate = include('helpers/modelCreate');
const name = 'Role';
const tableName = 'TIPOS_DE_ROLES';
const selectableProps = {
    id: 'ID_ROL_USUARIO',
    description: 'DESCRIPCION',
    observation: 'OBSERVACION',
    domain: 'DOMINIO'
};

class RoleType extends ModelCreate {
    constructor(props) {
        super({ ...props, name, tableName, selectableProps });
    }
}

module.exports = knex => new RoleType({ knex });
