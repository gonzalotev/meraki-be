const { roleNomenclator } = include('models');
const trim = require('lodash/trim');

class RoleNomenclatorService {
    static async findOne(userId) {
        const nomenclator = await roleNomenclator.findOne({ID_USUARIO: userId});
        return {nomenclator: nomenclator ? {
            id: nomenclator.ID_NOMENCLADOR,
            roleId: nomenclator.ID_ROL_USUARIO,
            domain: nomenclator.DOMINIO,
            observation: nomenclator.OBSERVACION,
            approved: nomenclator.SI_NO
        } : {}};
    }
    static async saveAssignmentNomenclator(nomenclator, userId) {
        const createNomenclator = {
            ID_USUARIO: userId,
            ID_ROL_USUARIO: nomenclator.roleId,
            ID_NOMENCLADOR: nomenclator.id,
            DOMINIO: trim(nomenclator.domain),
            OBSERVACION: trim(nomenclator.observation),
            SI_NO: nomenclator.approved,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null
        };
        return await roleNomenclator.insertOne(createNomenclator);
    }

    static async updateAssignmentNomenclator(nomenclator, userId) {
        const updateNomenclator = {
            ID_ROL_USUARIO: nomenclator.roleId,
            ID_NOMENCLADOR: nomenclator.id,
            DOMINIO: trim(nomenclator.domain),
            OBSERVACION: trim(nomenclator.observation),
            SI_NO: nomenclator.approved
        };
        return await roleNomenclator.updateOne({ID_USUARIO: userId}, updateNomenclator);
    }

    static async deleteAssigmentNomenclator(nomenclator, userId){
        const deleteNomenclator = {
            ID_USUARIO: userId,
            ID_ROL_USUARIO: nomenclator.roleId,
            ID_NOMENCLADOR: nomenclator.id
        };
        return await roleNomenclator.deleteOne(deleteNomenclator, {FECHA_BAJA: new Date()});
    }
}

module.exports = RoleNomenclatorService;
