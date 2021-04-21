const { rolesType: rolesTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');

class RolesTypeService {
    static async fetch() {
        const rolessTypes = await rolesTypeModel.find({FECHA_BAJA: null});
        return rolessTypes.map(rolesType => ({
            id: rolesType.ID_ROL_USUARIO,
            description: rolesType.DESCRIPCION,
            observation: rolesType.OBSERVACION,
            domain: rolesType.DOMINIO,
            approved: rolesType.SUPERVISADO,
            createdAt: dateToString(rolesType.FECHA_ALTA),
            userCreator: rolesType.ID_USUARIO_ALTA,
            userDeleted: rolesType.ID_USUARIO_BAJA,
            deletedAt: dateToString(rolesType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedRolesType = {
            ID_ROL_USUARIO: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const rolesType = await rolesTypeModel.insertOne(formattedRolesType);

        return {
            id: rolesType.ID_ROL_USUARIO,
            description: rolesType.DESCRIPCION,
            observation: rolesType.OBSERVACION,
            domain: rolesType.DOMINIO,
            approved: !!rolesType.SUPERVISADO,
            createdAt: dateToString(rolesType.FECHA_ALTA),
            userCreator: rolesType.ID_USUARIO_ALTA,
            userDeleted: rolesType.ID_USUARIO_BAJA,
            deletedAt: dateToString(rolesType.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const rolesType = await rolesTypeModel.findById({ID_ROL_USUARIO: filters.id});
        return {
            id: rolesType.ID_ROL_USUARIO,
            description: rolesType.DESCRIPCION,
            observation: rolesType.OBSERVACION,
            domain: rolesType.DOMINIO,
            approved: rolesType.SUPERVISADO,
            createdAt: dateToString(rolesType.FECHA_ALTA),
            userCreator: rolesType.ID_USUARIO_ALTA,
            userDeleted: rolesType.ID_USUARIO_BAJA,
            deletedAt: dateToString(rolesType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedRolesType = {
            ID_ROL_USUARIO: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const rolesType = await rolesTypeModel.updateOne({ID_ROL_USUARIO: filters.id},
            formattedRolesType);
        return {
            id: rolesType.ID_ROL_USUARIO,
            description: rolesType.DESCRIPCION,
            observation: rolesType.OBSERVACION,
            domain: rolesType.DOMINIO,
            approved: !!rolesType.SUPERVISADO,
            createdAt: dateToString(rolesType.FECHA_ALTA),
            userCreator: rolesType.ID_USUARIO_ALTA,
            userDeleted: rolesType.ID_USUARIO_BAJA,
            deletedAt: dateToString(rolesType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_ROL_USUARIO: filters.id};
        const success = await rolesTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = RolesTypeService;
