const { NewWordService } = include('services');

class NewWordController {
    static async fetch(req, res, next) {
        try {
            const newsPhrases = await NewWordService.fetch();
            res.send({ newsPhrases });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const newPhrase = await NewWordService.findOne(req.params);
            res.send({ newPhrase });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const newPhrase = await NewWordService.create(req.body, req.user.id);
            res.status(201);
            res.send({ newPhrase });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const newPhrase = await NewWordService.update(req.params, req.body);
            res.send({newPhrase});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await NewWordService.delete(req.params, req.user.id);
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

module.exports = NewWordController;
