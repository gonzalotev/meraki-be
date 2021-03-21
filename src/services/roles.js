const knex = include('helpers/database');
const { dateToString } = include('util');
const {rolesTableName} = include('constants');
const { roles } = include('models');

class RoleService {
    static async fetch() {
        const roles = await knex.select()
            .from(rolesTableName);

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
        const formattedRole = {
            ID_ROL_USUARIO: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const role = await roles.insertOne(formattedRole);

        return {
            id: role.ID_ROL_USUARIO,
            description: role.DESCRIPCION,
            observation: role.OBSERVACION,
            domain: role.DOMINIO,
            userCreator: role.ID_USUARIO_ALTA,
            userDelete: role.ID_USUARIO_BAJA,
            deletedAt: role.FECHA_BAJA,
            createdAt: role.FECHA_ALTA
        };
    }
}

module.exports = RoleService;
