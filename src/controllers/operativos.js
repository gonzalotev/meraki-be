const {Operativos} = include('/models');
const head = require('lodash/head');
const {PAGE_SIZE} = process.env;
class OperativosController{
    static async fetch(req, res, next){
        try {
            const {
                page,
                ...filter
            } = req.query;
            await Operativos.startTransaction();
            const operativos = await Operativos.find(page, {
                ...filter
                
            });
            const total = await Operativos.countRows();
            await Operativos.commitTransaction();
            res.send({
                limit: PAGE_SIZE,
                total,
                operativos
            });
        } catch(err) {
            next(err);
        }
    }
    static async fetchOne(req, res, next){
        try {
            const operativo = await Operativos.findById(req.params);
            res.send({operativo});
        } catch(err) {
            next(err);
        }
    }
    static async create(req, res, next){
        try {
            await Operativos.startTransaction();
            const insertedOne = head(await Operativos.insertOne(req.body));
            await Operativos.commitTransaction();
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
            await Operativos.startTransaction();
            const updatedOne = await Operativos.updateOne(req.query, req.body);
            await Operativos.commitTransaction();
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
            await Operativos.startTransaction();
            await Operativos.deletedOne(req.query);
            await Operativos.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = OperativosController;
