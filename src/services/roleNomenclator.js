const { roleNomenclator } = include('models');

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
}

module.exports = RoleNomenclatorService;
