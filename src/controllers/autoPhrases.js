const { AutoPhrasesService } = include('services');

class AutoPhrasesController {
    static async fetch(req, res, next) {
        try {
            const autoPhrases = await AutoPhrasesService.fetch(req.query);
            res.send({ autoPhrases });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try{
            const autoPhrase = await AutoPhrasesService.find(req.params);
            res.send({autoPhrase});
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const autoPhrase = await AutoPhrasesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ autoPhrase });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const autoPhrase = await AutoPhrasesService.update(req.params, req.body);
            res.send({autoPhrase});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await AutoPhrasesService.delete(req.params, req.user.id);
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

module.exports = AutoPhrasesController;
