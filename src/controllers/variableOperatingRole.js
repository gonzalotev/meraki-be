const {VariableOperatingRole} = include('/models');
const head = require('lodash/head');
const {PAGE_SIZE} = process.env;

class VariableOperatingRoleController {
    static async fetch(req, res, next){
        try {
            const {
                page,
                ...filter
            } = req.query;
            await VariableOperatingRole.startTransaction();
            const operatingRoles = await VariableOperatingRole.find(page, {...filter});
            const total = await VariableOperatingRole.countRows();
            await VariableOperatingRole.commitTransaction();
            res.send({limit: PAGE_SIZE, total, operatingRoles});
        } catch(err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next){
        try {
            const operatingRole = await VariableOperatingRole.findById(req.params);
            res.send({operatingRole});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            await VariableOperatingRole.startTransaction();
            const operatingRole = head(await VariableOperatingRole.insertOne(req.body));
            await VariableOperatingRole.commitTransaction();
            res.send({success: true, operatingRole});
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            await VariableOperatingRole.startTransaction();
            const operatingRole = await VariableOperatingRole.updateOne(req.query, req.body);
            await VariableOperatingRole.commitTransaction();
            res.send({success: true, operatingRole});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            await VariableOperatingRole.startTransaction();
            await VariableOperatingRole.deletedOne(req.query);
            await VariableOperatingRole.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = VariableOperatingRoleController;
