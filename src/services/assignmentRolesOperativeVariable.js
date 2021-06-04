const { assignmentRolesOperativeVariable: AssignmentRolesOperativeVariableModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class AssignmentRolesOperativeVariableService {
    static async fetch(query) {
        const assignmentsRolesOperativeVariables = await AssignmentRolesOperativeVariableModel.findByPage(
            query.page,
            { FECHA_BAJA: null },
            AssignmentRolesOperativeVariableModel.selectableProps,
            [{ column: 'ID_ROL_USUARIO', order: 'asc' }]
        );
        return assignmentsRolesOperativeVariables.map(AssignmentRolesOperativeVariable => ({
            idUser: AssignmentRolesOperativeVariable.ID_USUARIO,
            id: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yes_no: !!AssignmentRolesOperativeVariable.SI_NO,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        }));
    }

    static async create(params) {
        const formattedAssignmentRolesOperativeVariable = {
            ID_USUARIO: trim(params.idUser),
            ID_ROL_USUARIO: trim(params.id),
            ID_OPERATIVO: trim(params.operativeId),
            ID_LOTE: trim(params.lotId),
            ID_VARIABLE: trim(params.variableId),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SI_NO: params.yes_no,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const AssignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableModel.
            insertOne(formattedAssignmentRolesOperativeVariable);

        return {
            idUser: AssignmentRolesOperativeVariable.ID_USUARIO,
            id: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yes_no: !!AssignmentRolesOperativeVariable.SI_NO,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const AssignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableModel.findById({
            ID_ROL_USUARIO: filters.id
        });
        return {
            idUser: AssignmentRolesOperativeVariable.ID_USUARIO,
            id: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yes_no: !!AssignmentRolesOperativeVariable.SI_NO,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await AssignmentRolesOperativeVariableModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params) {
        const formattedAssignmentRolesOperativeVariable = {
            ID_USUARIO: trim(params.idUser),
            ID_ROL_USUARIO: trim(params.id),
            ID_OPERATIVO: trim(params.operativeId),
            ID_LOTE: trim(params.lotId),
            ID_VARIABLE: trim(params.variableId),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SI_NO: params.yes_no,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const AssignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableModel.updateOne(
            { ID_ROL_USUARIO: filters.id },
            formattedAssignmentRolesOperativeVariable
        );
        return {
            idUser: AssignmentRolesOperativeVariable.ID_USUARIO,
            id: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yes_no: !!AssignmentRolesOperativeVariable.SI_NO,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async delete(filters) {
        const formattedFilters = { ID_ROL_USUARIO: filters.id };
        const success = await AssignmentRolesOperativeVariableModel.deleteOne(formattedFilters,
            {FECHA_BAJA: new Date()
            });
        return !!success;
    }
}

module.exports = AssignmentRolesOperativeVariableService;
