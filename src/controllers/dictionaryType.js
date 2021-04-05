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
            res.send({ success: true, dictionary });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const dictionary = await DictionaryTypeService.update(req.params, req.body);
            res.send({success: true, dictionary});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await DictionaryTypeService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DictionaryTypeController;
