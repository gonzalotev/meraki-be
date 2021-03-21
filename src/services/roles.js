const knex = include('helpers/database');
const { dateToString, getPageSize } = include('util');
const {rolesTableName} = include('constants');
const { roles } = include('models');

class RoleService {
    static async fetch() {
        const roles = await knex.select()
            .from(rolesTableName)
            .limit(getPageSize());

        return roles.map(role => ({
            id: role.ID_ROL_USUARIO,
            description: role.DESCRIPCION,
            observation: role.OBSERVACION,
            domain: role.DOMINIO,
            createdAt: dateToString(role.FECHA_ALTA),
            userCreator: role.ID_USUARIO_ALTA,
            userDeleted: role.ID_USUARIO_BAJA,
            deletedAt: dateToString(role.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        return await roles.insertOne(params, userCreator);
    }
}

module.exports = RoleService;
