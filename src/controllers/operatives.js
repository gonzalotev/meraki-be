const {Operatives} = include('/models');
const head = require('lodash/head');
const {PAGE_SIZE} = process.env;

class OperativesController {
    static async fetch(req, res, next){
        try {
            const {page, ...filter} = req.query;
            await Operatives.startTransaction();
            const operatives = await Operatives.find(page, {...filter});
            const total = await Operatives.countRows();
            await Operatives.commitTransaction();
            res.send({limit: PAGE_SIZE, total, operatives});
        } catch(err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next){
        try {
            res.send({operatives: await Operatives.findById(req.params)});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            await Operatives.startTransaction();
            const operative = head(await Operatives.insertOne(req.body));
            await Operatives.commitTransaction();
            res.send({success: true, operative});
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            await Operatives.startTransaction();
            const operative = await Operatives.updateOne(req.query, req.body);
            await Operatives.commitTransaction();
            res.send({success: true, operative});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            await Operatives.startTransaction();
            await Operatives.deletedOne(req.query);
            await Operatives.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = OperativesController;
