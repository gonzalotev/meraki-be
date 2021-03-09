const {RolOperativoVariable} = include('/models');
const head = require('lodash/head');
const {PAGE_SIZE} = process.env;
class RolOperativoVariableController{
    static async fetch(req, res, next){
        try {
            const {
                page,
                ...filter
            } = req.query;
            await RolOperativoVariable.startTransaction();
            const operativosvariables = await RolOperativoVariable.find(page, {
                ...filter
                //FECHA_BAJA: null
            });
            const total = await RolOperativoVariable.countRows();
            await RolOperativoVariable.commitTransaction();
            res.send({
                limit: PAGE_SIZE,
                total,
                operativosvariables
            });
        } catch(err) {
            next(err);
        }
    }
    static async fetchOne(req, res, next){
        try {
            const operativovariable = await RolOperativoVariable.findById(req.params);
            res.send({operativovariable});
        } catch(err) {
            next(err);
        }
    }
    static async create(req, res, next){
        try {
            await RolOperativoVariable.startTransaction();
            const insertedOne = head(await RolOperativoVariable.insertOne(req.body));
            await RolOperativoVariable.commitTransaction();
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
            await RolOperativoVariable.startTransaction();
            const updatedOne = await RolOperativoVariable.updateOne(req.query, req.body);
            await RolOperativoVariable.commitTransaction();
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
            await RolOperativoVariable.startTransaction();
            await RolOperativoVariable.deletedOne(req.query);
            await RolOperativoVariable.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = RolOperativoVariableController;
