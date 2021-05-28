const { RelationshipNomenclatureService } = include('services');

class RelationshipNomenclatureController {
    static async fetch(req, res, next) {
        try {
            const relationshipsNomenclatures = await RelationshipNomenclatureService.fetch(req.query);
            const total = await RelationshipNomenclatureService.getTotal({});
            res.send({ relationshipsNomenclatures, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipNomenclature = await RelationshipNomenclatureService.findOne(req.params);
            res.send({ relationshipNomenclature });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relationshipNomenclature = await RelationshipNomenclatureService.create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipNomenclature });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const relationshipNomenclature = await RelationshipNomenclatureService.update(req.params, req.body);
            res.send({relationshipNomenclature});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RelationshipNomenclatureService.delete(req.params, req.user.id);
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

module.exports = RelationshipNomenclatureController;
