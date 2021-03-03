const {VariableEstadistica} = include('/models');
const head = require('lodash/head');
const {PAGE_SIZE} = process.env;
class VariableEstadisticaController{
    static async fetch(req, res, next){
        try {
            const {
                page,
                ...filter
            } = req.query;
            await VariableEstadistica.startTransaction();
            const variables = await VariableEstadistica.find(page, {
                ...filter,
            });
            const total = await VariableEstadistica.countRows();
            await VariableEstadistica.commitTransaction();
            res.send({
                limit: PAGE_SIZE,
                total,
                variables
            });
        } catch(err) {
            next(err);
        }
    }
    static async fetchOne(req, res, next){
        try {
            const variable = await VariableEstadistica.findById(req.params);
            res.send({variable});
        } catch(err) {
            next(err);
        }
    }
    static async create(req, res, next){
        try {
            await VariableEstadistica.startTransaction();
            const insertedOne = head(await VariableEstadistica.insertOne(req.body));
            await VariableEstadistica.commitTransaction();
            res.send({
                success: true,
                insertedOne
            });
        } catch(err) {
            next(err);
        }
    }
    static async update(req, res, next){
        try{
            await VariableEstadistica.startTransaction();
            const updatedOne = await VariableEstadistica.updateOne(req.query, req.body);
            await VariableEstadistica.commitTransaction();
            res.send({
                success: true,
                updatedOne
            });
        } catch(err){
            next(err);
        }
    }
    static async delete(req, res, next){
        try {
            await VariableEstadistica.startTransaction();
            await VariableEstadistica.deletedOne(req.query);
            await VariableEstadistica.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = VariableEstadisticaController;
