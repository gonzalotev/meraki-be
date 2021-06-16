const { assignmentRole: assignmentRoleModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class AssignmentRoleService {
    static async fetch(query) {
        const assignmentsRoles = await assignmentRoleModel.findByPage(
            query.page,
            [],
            assignmentRoleModel.selectableProps,
            [{ column: 'NOMBRE_USUARIO', order: 'asc' }]
        );
        return assignmentsRoles.map(assignmentRole => ({
            id: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            idUser: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        }));
    }

    static async create(params) {
        const formattedAssignmentRole = {
            ID_ROL_USUARIO: trim(params.id),
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: trim(params.idUser),
            NOMBRE_USUARIO: trim(params.userName),
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const assignmentRole = await assignmentRoleModel.insertOne(formattedAssignmentRole);

        return {
            id: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            idUser: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const assignmentRole = await assignmentRoleModel.findById({
            ID_ROL_USUARIO: filters.id
        });
        return {
            id: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            idUser: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await assignmentRoleModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params) {
        const formattedAssignmentRole = {
            ID_ROL_USUARIO: trim(params.id),
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: trim(params.idUser),
            NOMBRE_USUARIO: trim(params.userName),
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const assignmentRole = await assignmentRoleModel.updateOne(
            { ID_ROL_USUARIO: params.id, ID_USUARIO: params.idUser},
            formattedAssignmentRole
        );
        return {
            id: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            idUser: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        };
    }

    static async delete(filters) {
        const formattedFilters = { ID_ROL_USUARIO: filters.id };
        const success = await assignmentRoleModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date()
        });
        return !!success;
    }
}

module.exports = AssignmentRoleService;
