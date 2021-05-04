const { roleVariable } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class RoleVariable {
    static async findOne(userId) {
        const statisticalVariable = await roleVariable.findOne({ID_USUARIO: userId});
        return {statisticalVariable: statisticalVariable ? {
            id: statisticalVariable.ID_VARIABLE,
            operativeId: statisticalVariable.ID_OPERATIVO,
            lotId: statisticalVariable.ID_LOTE,
            roleId: statisticalVariable.ID_ROL_USUARIO,
            domain: statisticalVariable.DOMINIO,
            observation: statisticalVariable.OBSERVACION,
            approved: statisticalVariable.SI_NO,
            createdAt: dateToString(statisticalVariable.FECHA_ALTA)
        } : {}};
    }
    static async saveAssignmentVariable(variable, userId) {
        const createVariable = {
            ID_USUARIO: userId,
            ID_ROL_USUARIO: variable.roleId,
            ID_VARIABLE: variable.id,
            ID_OPERATIVO: variable.operativeId,
            ID_LOTE: variable.lotId,
            DOMINIO: trim(variable.domain),
            OBSERVACION: trim(variable.observation),
            SI_NO: variable.approved,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null
        };
        return await roleVariable.insertOne(createVariable);
    }

    static async updateAssignmentVariable(variable, userId) {
        const updateVariable = {
            ID_ROL_USUARIO: variable.roleId,
            ID_VARIABLE: variable.id,
            ID_OPERATIVO: variable.operativeId,
            ID_LOTE: variable.lotId,
            DOMINIO: trim(variable.domain),
            OBSERVACION: trim(variable.observation),
            SI_NO: variable.approved
        };
        return await roleVariable.updateOne({ID_USUARIO: userId}, updateVariable);
    }

    static async deleteAssigmentVariable(variable, userId){
        const deleteVariable = {
            ID_USUARIO: userId,
            ID_ROL_USUARIO: variable.roleId,
            ID_VARIABLE: variable.id,
            ID_OPERATIVO: variable.operativeId,
            ID_LOTE: variable.lotId
        };
        return await roleVariable.deleteOne(deleteVariable, {FECHA_BAJA: new Date()});
    }
}

module.exports = RoleVariable;
