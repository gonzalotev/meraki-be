const { organizationType: organizationTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class OrganizationTypeService {
    static async fetch() {
        const organizationsTypes = await organizationTypeModel.find({FECHA_BAJA: null});
        return organizationsTypes.map(organizationType => ({
            id: organizationType.ID_TIPO_ORGANIZACION,
            abbreviation: organizationType.ABREVIATURA,
            description: organizationType.DESCRIPCION,
            observation: organizationType.OBSERVACION,
            domain: organizationType.DOMINIO,
            approved: organizationType.SUPERVISADO,
            createdAt: dateToString(organizationType.FECHA_ALTA),
            userCreator: organizationType.ID_USUARIO_ALTA,
            userDeleted: organizationType.ID_USUARIO_BAJA,
            deletedAt: dateToString(organizationType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedOrganizationType = {
            ID_TIPO_ORGANIZACION: trim(params.id),
            ABREVIATURA: trim(params.abbreviation),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const organizationType = await organizationTypeModel.insertOne(formattedOrganizationType);

        return {
            id: organizationType.ID_TIPO_ORGANIZACION,
            abbreviation: organizationType.ABREVIATURA,
            description: organizationType.DESCRIPCION,
            observation: organizationType.OBSERVACION,
            domain: organizationType.DOMINIO,
            approved: !!organizationType.SUPERVISADO,
            createdAt: dateToString(organizationType.FECHA_ALTA),
            userCreator: organizationType.ID_USUARIO_ALTA,
            userDeleted: organizationType.ID_USUARIO_BAJA,
            deletedAt: dateToString(organizationType.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const organizationType = await organizationTypeModel.findById({ID_TIPO_ORGANIZACION: filters.id});
        return {
            id: organizationType.ID_TIPO_ORGANIZACION,
            abbreviation: organizationType.ABREVIATURA,
            description: organizationType.DESCRIPCION,
            observation: organizationType.OBSERVACION,
            domain: organizationType.DOMINIO,
            approved: !!organizationType.SUPERVISADO,
            createdAt: dateToString(organizationType.FECHA_ALTA),
            userCreator: organizationType.ID_USUARIO_ALTA,
            userDeleted: organizationType.ID_USUARIO_BAJA,
            deletedAt: dateToString(organizationType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedOrganizationType = {
            ID_TIPO_ORGANIZACION: params.id,
            ABREVIATURA: trim(params.abbreviation),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const organizationType = await organizationTypeModel.updateOne({ID_TIPO_ORGANIZACION: filters.id},
            formattedOrganizationType);
        return {
            id: organizationType.ID_TIPO_ORGANIZACION,
            abbreviation: organizationType.ABREVIATURA,
            description: organizationType.DESCRIPCION,
            observation: organizationType.OBSERVACION,
            domain: organizationType.DOMINIO,
            approved: !!organizationType.SUPERVISADO,
            createdAt: dateToString(organizationType.FECHA_ALTA),
            userCreator: organizationType.ID_USUARIO_ALTA,
            userDeleted: organizationType.ID_USUARIO_BAJA,
            deletedAt: dateToString(organizationType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_ORGANIZACION: filters.id};
        const success = await organizationTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = OrganizationTypeService;