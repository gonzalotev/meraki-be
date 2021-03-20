const {VariableEstadistica: StatisticalVariable} = include('/models');
const head = require('lodash/head');
const {PAGE_SIZE} = process.env;

class StatisticalVariableController {
    static async fetch(req, res, next){
        try {
            const {page, ...filter} = req.query;
            await StatisticalVariable.startTransaction();
            const variables = await StatisticalVariable.find(page, {...filter});
            const total = await StatisticalVariable.countRows();
            await StatisticalVariable.commitTransaction();
            res.send({limit: PAGE_SIZE, total, variables});
        } catch(err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next){
        try {
            const variable = await StatisticalVariable.findById(req.params);
            res.send({variable});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            await StatisticalVariable.startTransaction();
            const statisticalVariable = head(await StatisticalVariable.insertOne(req.body));
            await StatisticalVariable.commitTransaction();
            res.send({success: true, statisticalVariable});
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            await StatisticalVariable.startTransaction();
            const statisticalVariable = await StatisticalVariable.updateOne(req.query, req.body);
            await StatisticalVariable.commitTransaction();
            res.send({success: true, statisticalVariable});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            await StatisticalVariable.startTransaction();
            await StatisticalVariable.deletedOne(req.query);
            await StatisticalVariable.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = StatisticalVariableController;
