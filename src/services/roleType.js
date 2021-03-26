const knex = include('helpers/database');
const { dateToString } = include('util');
const {roleTypeTableName} = include('constants');

class RoleTypeService {
    static async find() {
        const roles = await knex.select().from(roleTypeTableName);
        return roles.map(role => ({
            id: role.ID_ROL_USUARIO,
            description: role.DESCRIPCION,
            observation: role.OBSERVACION,
            domain: role.DOMINIO,
            createdAt: dateToString(role.FECHA_ALTA),
            deletedAt: dateToString(role.FECHA_BAJA),
            userCreator: role.ID_USUARIO_ALTA,
            userDeleted: role.ID_USUARIO_BAJA
        }));
    }
}

module.exports = RoleTypeService;
