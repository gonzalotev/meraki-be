const { WordsDictionaryService } = include('services');

class WordsDictionaryController {
    static async fetch(req, res, next) {
        try {
            const words = await WordsDictionaryService.fetch();
            res.send({ words });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const wordDictionary = await WordsDictionaryService.findOne(req.params);
            res.send({ wordDictionary });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const word = await WordsDictionaryService.create(req.body, req.user.id);
            res.send({ success: true, word });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const word = await WordsDictionaryService.update(req.params, req.body);
            res.send({success: true, word});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await WordsDictionaryService.delete(req.params, req.user.id);
            if (success){
                res.sendStatus(204);
            }else{
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = WordsDictionaryController;