const {variableOperatingRole} = include('/models');
const head = require('lodash/head');
const {PAGE_SIZE} = process.env;

class VariableOperatingRoleController {
    static async fetch(req, res, next){
        try {
            const {page, ...filter} = req.query;
            await variableOperatingRole.startTransaction();
            const operativeVariables = await variableOperatingRole.find(page, {...filter});
            const total = await variableOperatingRole.countRows();
            await variableOperatingRole.commitTransaction();
            res.send({limit: PAGE_SIZE, total, operativeVariables});
        } catch(err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next){
        try {
            const operativeVariables = await variableOperatingRole.findById(req.params);
            res.send({operativeVariables});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            await variableOperatingRole.startTransaction();
            const operativeVariables = head(await variableOperatingRole.insertOne(req.body));
            await variableOperatingRole.commitTransaction();
            res.send({success: true, operativeVariables});
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            await variableOperatingRole.startTransaction();
            const operativeVariables = await variableOperatingRole.updateOne(req.query, req.body);
            await variableOperatingRole.commitTransaction();
            res.send({success: true, operativeVariables});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            await variableOperatingRole.startTransaction();
            await variableOperatingRole.deletedOne(req.query);
            await variableOperatingRole.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = VariableOperatingRoleController;
