const { AutoPhraseNomenclatureRelationService } = include('services');

class AutoPhraseNomenclatureRelationController {
    static async fetch(req, res, next) {
        try {
            const relations = await AutoPhraseNomenclatureRelationService.fetch(req.query);
            res.send({ relations });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try{
            const relation = await AutoPhraseNomenclatureRelationService.find(req.params);
            res.send({relation});
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relation = await AutoPhraseNomenclatureRelationService.create(req.body, req.user.id);
            res.status(201);
            res.send({ relation });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const relation = await AutoPhraseNomenclatureRelationService.update(req.params, req.body);
            res.send({relation});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await AutoPhraseNomenclatureRelationService.delete(req.params, req.user.id);
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

module.exports = AutoPhraseNomenclatureRelationController;
