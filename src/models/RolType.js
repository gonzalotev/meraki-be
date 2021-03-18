const ModelCreate = include('helpers/modelCreate');
const name = 'RoleType';
const tableName = 'TIPOS_DE_ROLES';
const selectableProps = [
    'ID_ROL_USUARIO',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO'
];

class RoleType extends ModelCreate {
    constructor(props) {
        super({ ...props, name, tableName, selectableProps });
    }
}

module.exports = knex => new RoleType({ knex });
