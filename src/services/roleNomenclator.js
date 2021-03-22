const { assignmentRoleNomenclatorsAttrib} = include('constants');
const { roleNomenclator } = include('models');

class RoleNomenclatorService {
    static async findOne(userId) {
        const nomenclator = await roleNomenclator.findOne({ID_USUARIO: userId}, assignmentRoleNomenclatorsAttrib);
        return {nomenclator: nomenclator || {}};
    }
}

module.exports = RoleNomenclatorService;
