const { assignmentRolesNomenclator: assignmentRolesNomenclatorModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class AssignmentRolesNomenclatorService {
    static async fetch(query) {
        const assignmentsRolesNomenclators = await assignmentRolesNomenclatorModel.findByPage(
            query.page,
            { FECHA_BAJA: null },
            assignmentRolesNomenclatorModel.selectableProps,
            [{ column: 'ID_ROL_USUARIO', order: 'asc' }]
        );
        return assignmentsRolesNomenclators.map(assignmentRolesNomenclator => ({
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            idUser: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: !!assignmentRolesNomenclator.SI_NO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        }));
    }

    static async create(params) {
        const formattedAssignmentRolesNomenclator = {
            ID_ROL_USUARIO: trim(params.id),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: trim(params.idUser),
            SI_NO: params.yes_no,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.
            insertOne(formattedAssignmentRolesNomenclator);

        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            idUser: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: assignmentRolesNomenclator.SI_NO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.findById({
            ID_ROL_USUARIO: filters.id
        });
        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            idUser: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: assignmentRolesNomenclator.SI_NO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await assignmentRolesNomenclatorModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params) {
        const formattedAssignmentRolesNomenclator = {
            ID_ROL_USUARIO: trim(params.id),
            ID_NOMENCLADOR: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: trim(params.idUser),
            SI_NO: trim(params.yes_no),
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.updateOne(
            { ID_ROL_USUARIO: filters.id },
            formattedAssignmentRolesNomenclator
        );
        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            idUser: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: assignmentRolesNomenclator.SI_NO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        };
    }

    static async delete(filters) {
        const formattedFilters = { ID_ROL_USUARIO: filters.id };
        const success = await assignmentRolesNomenclatorModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date()
        });
        return !!success;
    }
}

module.exports = AssignmentRolesNomenclatorService;
