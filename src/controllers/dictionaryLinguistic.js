const { DictionaryLinguisticService } = include('services');
const head = require('lodash/head');
const {DictionaryLinguistic} = include('/models');
const {PAGE_SIZE} = process.env;

class DictionaryLinguisticController {
    static async fetch(req, res, next) {
        try {
            const dictionaryLinguistic = await DictionaryLinguisticService.find(req.query.page);
            res.send({ dictionaryLinguistic });
        } catch(error) {
            next(error);
        }
    }

    static async fetchOlder(req, res, next){
        try {
            const {page, ...filter} = req.query;
            await DictionaryLinguistic.startTransaction();
            const dictionaries = await DictionaryLinguistic.find(page, {...filter, FECHA_BAJA: null});
            const total = await DictionaryLinguistic.countRows();
            await DictionaryLinguistic.commitTransaction();
            res.send({limit: PAGE_SIZE, total, dictionaries});
        } catch(err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next){
        try {
            const dictionary = await DictionaryLinguistic.findById(req.params);
            res.send({dictionary});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            await DictionaryLinguistic.startTransaction();
            const dictionary = head(await DictionaryLinguistic.insertOne(req.body));
            await DictionaryLinguistic.commitTransaction();
            res.send({success: true, dictionary});
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            await DictionaryLinguistic.startTransaction();
            const dictionary = await DictionaryLinguistic.updateOne(req.query, req.body);
            await DictionaryLinguistic.commitTransaction();
            res.send({success: true, dictionary});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            await DictionaryLinguistic.startTransaction();
            await DictionaryLinguistic.deletedOne(req.query);
            await DictionaryLinguistic.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DictionaryLinguisticController;
