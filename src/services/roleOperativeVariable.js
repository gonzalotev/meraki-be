const { roleOperativeVariable: roleOperativeVariableModel } = include('models');
class RoleOperativeVariable {
    static async findOne(userId) {
        const roleOperativeVariable = await roleOperativeVariableModel.findOne({ID_USUARIO: userId});
        return {statisticalVariable: roleOperativeVariable ? {
            id: roleOperativeVariable.ID_VARIABLE,
            operativeId: roleOperativeVariable.ID_OPERATIVO,
            lotId: roleOperativeVariable.ID_LOTE,
            roleId: roleOperativeVariable.ID_ROL_USUARIO,
            domain: roleOperativeVariable.DOMINIO,
            observation: roleOperativeVariable.OBSERVACION,
            approved: roleOperativeVariable.SI_NO,
            createdAt: roleOperativeVariable.FECHA_ALTA
        } : {}};
    }
}

module.exports = RoleOperativeVariable;
