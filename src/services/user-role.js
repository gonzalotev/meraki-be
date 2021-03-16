const knex = include('helpers/database');
const { dateToString, getOffset, getPageSize } = include('util');
const tableName = 'ROLES_SICI';

class RoleTypeService {
    static async find(page) {
        const userRoles = await knex.select()
            .from(tableName)
            .limit(getPageSize())
            .offset(getOffset(page));

        return userRoles.map(userRole => ({
            id_user: userRole.ID_USUARIO,
            id_role: userRole.ID_ROL_USUARIO,
            description: userRole.DESCRIPCION,
            domain: userRole.DOMINIO,
            observation: userRole.OBSERVACION,
            createdAt: dateToString(userRole.FECHA_ALTA),
            deletedAt: dateToString(userRole.FECHA_BAJA)
        }));
    }
}

module.exports = RoleTypeService;
