const ModelCreate = include('/helpers/modelCreate');
const name = 'RoleNomenclator';
const tableName = 'RELACION_ROLES_USUARIOS_NOMENCLADORES';
const selectableProps = {
    userId: 'ID_USUARIO',
    roleId: 'ID_ROL_USUARIO',
    nomenclatorId: 'ID_NOMENCLADOR',
    domain: 'DOMINIO',
    observation: 'OBSERVACION',
    aprroved: 'SI_NO'
};
const handleProps = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA'
};

class RoleNomenclator extends ModelCreate{
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

module.exports = knex => new RoleNomenclator({knex});
