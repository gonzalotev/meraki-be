const { DictionaryTypeService } = include('services');

class DictionaryTypeController {
    static async fetch(req, res, next) {
        try {
            const dictionaries = await DictionaryTypeService.fetch();
            res.send({ dictionaries });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const dictionary = await DictionaryTypeService.findOne(req.params);
            res.send({ dictionary });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const dictionary = await DictionaryTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ dictionary });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const dictionary = await DictionaryTypeService.update(req.params, req.body);
            res.send({ dictionary });
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await DictionaryTypeService.delete(req.params, req.user.id);
            if (success) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DictionaryTypeController;
