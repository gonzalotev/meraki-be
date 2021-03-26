const { dateToString } = include('util');
const { roleUser } = include('models');

class UserRoleService {
    static async find(page) {
        const userRoles = await roleUser.findByPage(page);
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
        const userRole = await roleUser.findOne({ID_USUARIO: userId});
        return {role: userRole ? {
            id: userRole.ID_ROL_USUARIO,
            description: userRole.DESCRIPCION,
            domain: userRole.DOMINIO,
            observation: userRole.OBSERVACION,
            createdAt: userRole.FECHA_ALTA
        } : {}};
    }

    static async saveAssignmentRole(role, userId) {
        const createRole = {
            ID_USUARIO: userId,
            ID_ROL_USUARIO: role.id,
            DESCRIPCION: role.description,
            DOMINIO: role.domain,
            OBSERVACION: role.observation,
            FECHA_ALTA: new Date()
        };
        const newRole = await roleUser.insertOne(createRole);
        return newRole;
    }

    static async updateAssignmentRole(role, userId) {
        const updateRole = {
            ID_USUARIO: userId,
            ID_ROL_USUARIO: role.id,
            DESCRIPCION: role.description,
            DOMINIO: role.domain,
            OBSERVACION: role.observation,
            FECHA_ALTA: new Date()
        };
        return await roleUser.updateOne({ID_USUARIO: userId}, updateRole);
    }
}

module.exports = UserRoleService;
