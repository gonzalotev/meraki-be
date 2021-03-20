const { RoleNomenclator, RoleOperativeVariable, RoleUser } = include('models');
const { rename } = include('util');
const { rolesSiCIAttrib, variablesAttrib, nomenclatorsAttrib } = include('constants');
const has = require('lodash/has');

class AssigmentController {
    static async find(req, res, next) {
        try {
            const { userId } = req.params;
            const roles = await RoleUser.find({ userId }, rolesSiCIAttrib);
            const statisticsVariables = await RoleOperativeVariable.find({userId}, variablesAttrib);
            const nomenclators = await RoleNomenclator.find({userId}, nomenclatorsAttrib);
            res.send({ userId, roles, statisticsVariables, nomenclators });
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
                await RoleUser.insertOne({...role, userId});
                success = true;
            }
            if(has(body, 'nomenclator')){
                const nomenclator = rename(body.nomenclator, 'id', 'nomenclatorId');
                await RoleNomenclator.insertOne({...nomenclator, userId});
                success = true;
            }
            if(has(body, 'statisticalVariable')){
                const statisticalVariable = rename(body.statisticalVariable, 'id', 'variableId');
                await RoleOperativeVariable.insertOne({...statisticalVariable, userId});
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

    static async delete(req, res, next){
        try {
            let success = false;
            const { userId } = req.body;
            const { body } = req;
            if(has(body, 'role')){
                const { id: roleId } = body.role;
                await RoleUser.deleteOne({roleId, userId});
                success = true;
            }
            if(has(body, 'nomenclator')){
                const { id: nomenclatorId, roleId } = body.nomenclator;
                await RoleNomenclator.deleteOne({roleId, nomenclatorId, userId});
                success = true;
            }
            if(has(body, 'statisticalVariable')){
                const { id: variableId, roleId } = body.statisticalVariable;
                await RoleOperativeVariable.deleteOne({roleId, variableId, userId});
                success = true;
            }
            res.send({ success });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = AssigmentController;
