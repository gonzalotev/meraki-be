const { RoleNomenclator, RoleOperativeVariable, RoleUser } = include('models');
const { rename } = include('util');
const has = require('lodash/has');
const assign = require('lodash/assign');
const selectableRoleProps = {
    id: 'ID_ROL_USUARIO',
    description: 'DESCRIPCION',
    domain: 'DOMINIO',
    observation: 'OBSERVACION'
};
const selectableVariableProps = {
    roleId: 'ID_ROL_USUARIO',
    operativeId: 'ID_OPERATIVO',
    lotId: 'ID_LOTE',
    variableId: 'ID_VARIABLE',
    observation: 'OBSERVACION',
    domain: 'DOMINIO',
    isSupervised: 'SI_NO'
};
const selectableProps = {
    roleId: 'ID_ROL_USUARIO',
    nomenclatorId: 'ID_NOMENCLADOR',
    domain: 'DOMINIO',
    observation: 'OBSERVACION',
    isSupervised: 'SI_NO'
};

class AssigmentController {
    static async fetch(req, res, next) {
        try {
            const { userId } = req.params;
            const roles = await RoleUser.find({userId}, selectableRoleProps);
            const statisticalsVariables = await RoleOperativeVariable.find({userId}, selectableVariableProps);
            const nomenclators = await RoleNomenclator.find({userId}, selectableProps);
            res.send({ roles, statisticalsVariables, nomenclators });
        } catch(error) {
            next(error);
        }
    }
    static async create(req, res, next){
        try {
            let success = false;
            const { userId } = req.body;
            const { body } = req;
            if(has(body, 'role')){
                const role = rename(body.role, 'id', 'roleId');
                assign(role, { userId });
                await RoleUser.insertOne(role);
                success = true;
            }
            if(has(body, 'nomenclator')){
                const nomenclator = rename(body.nomenclator, 'id', 'nomenclatorId');
                assign(nomenclator, { userId });
                await RoleNomenclator.insertOne(nomenclator);
                success = true;
            }
            if(has(body, 'statisticalVariable')){
                const statisticalVariable = rename(body.statisticalVariable, 'id', 'variableId');
                assign(statisticalVariable, { userId });
                await RoleOperativeVariable.insertOne(statisticalVariable);
                success = true;
            }
            res.send({ success });
        } catch(error) {
            next(error);
        }
    }
    static async update(req, res, next){
        try {
            let success = false;
            const { userId } = req.body;
            const { body } = req;
            if(has(body, 'role')){
                const { id: roleId, ...role } = body.role;
                await RoleUser.updateOne({roleId, userId}, role);
                success = true;
            }
            if(has(body, 'nomenclator')){
                const { id: nomenclatorId, roleId, ...nomenclator } = body.nomenclator;
                await RoleNomenclator.updateOne({roleId, nomenclatorId, userId}, nomenclator);
                success = true;
            }
            if(has(body, 'statisticalVariable')){
                const { id: variableId, roleId, ...statisticalVariable } = body.statisticalVariable;
                await RoleOperativeVariable.updateOne({roleId, variableId, userId}, statisticalVariable);
                success = true;
            }
            res.send({ success });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = AssigmentController;
