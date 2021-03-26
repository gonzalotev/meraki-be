const { roleOperativeVariable: roleOperativeVariableModel } = include('models');
class RoleOperativeVariable {
    static async findOne(userId) {
        const roleOperativeVariable = await roleOperativeVariableModel.findOne({ID_USUARIO: userId});
        return {statisticalVariable: roleOperativeVariable || {}};
    }
}

module.exports = RoleOperativeVariable;
