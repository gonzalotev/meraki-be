const { UserRoleService, RoleVariableService, RoleNomenclatorService } = include('services');
const has = require('lodash/has');

class AssigmentController {
    static async find(req, res, next) {
        try {
            const { userId } = req.params;
            const {role} = await UserRoleService.findOne(userId);
            const {statisticalVariable} = await RoleVariableService.findOne(userId);
            const {nomenclator} = await RoleNomenclatorService.findOne(userId);

            res.send({assignment: { userId, role, statisticalVariable, nomenclator }});
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
                if(body.role.createdAt) {
                    await UserRoleService.updateAssignmentRole(body.role, userId);
                } else {
                    await UserRoleService.saveAssignmentRole(body.role, userId);
                }
                success = true;
            }
            if(has(body, 'nomenclator')){
                if(body.nomenclator.createdAt) {
                    await RoleNomenclatorService.updateAssignmentNomenclator(body.nomenclator, userId);
                } else {
                    await RoleNomenclatorService.saveAssignmentNomenclator(body.nomenclator, userId);
                }
                success = true;
            }
            if(has(body, 'statisticalVariable')){
                if(body.statisticalVariable.createdAt) {
                    await RoleVariableService.updateAssignmentVariable(body.statisticalVariable, userId);
                } else {
                    await RoleVariableService.saveAssignmentVariable(body.statisticalVariable, userId);
                }
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
            const { userId, ...body } = req.body;
            if(has(body, 'role')){
                await UserRoleService.updateAssignmentRole(body.role, userId);
                success = true;
            }
            if(has(body, 'nomenclator')){
                await RoleNomenclatorService.updateAssignmentNomenclator(body.nomenclator, userId);
                success = true;
            }
            if(has(body, 'statisticalVariable')){
                await RoleVariableService.updateAssignmentVariable(body.statisticalVariable, userId);
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
            const { userId, ...body } = req.body;
            if(has(body, 'role')){
                await UserRoleService.deleteAssigmentRole(body.role, userId);
                success = true;
            }
            if(has(body, 'nomenclator')){
                await RoleNomenclatorService.deleteAssigmentNomenclator(body.nomenclator, userId);
                success = true;
            }
            if(has(body, 'statisticalVariable')){
                await RoleVariableService.deleteAssigmentVariable(body.statisticalVariable, userId);
                success = true;
            }
            res.send({ success });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = AssigmentController;
