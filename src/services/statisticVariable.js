const { assignmentStaticalVariableAttrib } = include('constants');
const { statisticalVariable } = include('models');

class RoleTypeService {
    static async findOne(userId) {
        const variable = await statisticalVariable.findOne({ID_USUARIO: userId}, assignmentStaticalVariableAttrib);
        return {statisticalVariable: variable || {}};
    }
}

module.exports = RoleTypeService;
