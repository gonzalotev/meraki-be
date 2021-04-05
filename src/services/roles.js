const { roles: rolesModel } = include('models');
const { dateToString } = include('util');

class RoleService {
    static async fetch() {
        const roles = await rolesModel.find();

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
        const role = await rolesModel.insertOne(formattedRole);

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

    static async findOne(filters){
        const formattedFilters = {ID_ROL_USUARIO: filters.id};
        const role = await rolesModel.findById(formattedFilters);
        return {
            id: role.ID_ROL_USUARIO,
            description: role.DESCRIPCION,
            observation: role.OBSERVACION,
            domain: role.DOMINIO,
            createdAt: dateToString(role.FECHA_ALTA),
            userCreator: role.ID_USUARIO_ALTA,
            userDeleted: role.ID_USUARIO_BAJA,
            deletedAt: dateToString(role.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedOperative = {
            ID_ROL_USUARIO: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: params.createdAt
        };
        const formattedFilters = {ID_ROL_USUARIO: filters.id};
        const role = await rolesModel.updateOne(formattedFilters, formattedOperative);
        return {
            id: role.ID_ROL_USUARIO,
            description: role.DESCRIPCION,
            observation: role.OBSERVACION,
            domain: role.DOMINIO,
            createdAt: dateToString(role.FECHA_ALTA),
            userCreator: role.ID_USUARIO_ALTA,
            userDeleted: role.ID_USUARIO_BAJA,
            deletedAt: dateToString(role.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_ROL_USUARIO: filters.id};
        const success = await rolesModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return success;
    }
}

module.exports = RoleService;
