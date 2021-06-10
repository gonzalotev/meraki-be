const { DictionaryLinguisticService, StaticalVariableService, DictionaryTypeService } = include('services');
const toUpper = require('lodash/toUpper');

class DictionaryLinguisticController {
    static async fetch(req, res, next) {
        try {
            const {page, search} = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            let dictionaries = await DictionaryLinguisticService.fetch({page, search: searchValue});
            dictionaries = await DictionaryTypeService.includeDictionariesTypes(dictionaries);
            dictionaries = await StaticalVariableService.includeVariables(dictionaries);
            const total = await DictionaryLinguisticService.getTotal({search: searchValue});
            res.send({ dictionaryLinguistics: dictionaries, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try{
            const dictionaryLinguistic = await DictionaryLinguisticService.findOne(req.params);
            res.send({dictionaryLinguistic});
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const dictionaryLinguistic = await DictionaryLinguisticService.create(req.body, req.user.id);
            res.status(201);
            res.send({ dictionaryLinguistic });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const dictionaryLinguistic = await DictionaryLinguisticService.update(req.params, req.body);
            res.send({dictionaryLinguistic});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await DictionaryLinguisticService.delete(req.params, req.user.id);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static downloadCsv(req, res, next){
        try {
            res.send({});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DictionaryLinguisticController;
