const { LinguisticDictionaryTypeService } = include('services');

class LinguisticDictionaryTypeController {
    static async fetch(req, res, next) {
        try {
            const linguisticDictionarysTypes = await LinguisticDictionaryTypeService.fetch();
            res.send({ linguisticDictionarysTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const linguisticDictionaryType = await LinguisticDictionaryTypeService.findOne(req.params);
            res.send({ linguisticDictionaryType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const linguisticDictionaryType = await LinguisticDictionaryTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ linguisticDictionaryType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const linguisticDictionaryType = await LinguisticDictionaryTypeService.update(req.params, req.body);
            res.send({linguisticDictionaryType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await LinguisticDictionaryTypeService.delete(req.params, req.user.id);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = LinguisticDictionaryTypeController;
