const knex = include('helpers/database');
const { dateToString, getOffset, getPageSize } = include('util');
const { rolesTableName, assignmentRolesAttrib } = include('constants');
const { roleUser } = include('models');

class UserRoleService {
    static async find(page) {
        const userRoles = await knex.select()
            .from(rolesTableName)
            .limit(getPageSize())
            .offset(getOffset(page));

        return userRoles.map(userRole => ({
            idUser: userRole.ID_USUARIO,
            idRole: userRole.ID_ROL_USUARIO,
            description: userRole.DESCRIPCION,
            domain: userRole.DOMINIO,
            observation: userRole.OBSERVACION,
            createdAt: dateToString(userRole.FECHA_ALTA),
            deletedAt: dateToString(userRole.FECHA_BAJA)
        }));
    }

    static async findOne(userId) {
        const userRole = await roleUser.findOne({ID_USUARIO: userId}, assignmentRolesAttrib);
        return {role: userRole || {}};
    }
}

module.exports = UserRoleService;
