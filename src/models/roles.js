const ModelCreate = include('helpers/modelCreate');
const {rolesTableName, rolesAttrib} = include('constants');
const name = 'roles';

const handleProps = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA',
    userCreator: 'ID_USUARIO_ALTA',
    userDestroyer: 'ID_USUARIO_BAJA'
};

class Roles extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            tableName: rolesTableName,
            selectableProps: rolesAttrib,
            handleProps
        });
    }
}

module.exports = knex => new Roles({ knex });
