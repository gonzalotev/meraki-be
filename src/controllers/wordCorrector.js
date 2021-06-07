const { WordCorrectorService } = include('services');

class WordCorrectorController {
    static async fetch(req, res, next) {
        try {
            const wordsCorrectors = await WordCorrectorService.fetch(req.query);
            res.send({ wordsCorrectors });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const wordCorrector = await WordCorrectorService.findOne(req.params);
            res.send({ wordCorrector });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const wordCorrector = await WordCorrectorService.create(req.body.corrector, req.user.id);
            res.status(201);
            res.send({ wordCorrector });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const wordCorrector = await WordCorrectorService.update(req.params, req.body.corrector);
            res.send({wordCorrector});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await WordCorrectorService.delete(req.params, req.user.id);
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

module.exports = WordCorrectorController;
