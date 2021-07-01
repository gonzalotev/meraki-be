const { RelationshipTypeService } = include('services');

class RelationshipTypeController {
    static async fetch(req, res, next) {
        try {
            const relationshipsTypes = await RelationshipTypeService.fetch();
            res.send({ relationshipsTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipType = await RelationshipTypeService.findOne(req.params);
            res.send({ relationshipType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relationshipType = await RelationshipTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const relationshipType = await RelationshipTypeService.update(req.params, req.body);
            res.send({relationshipType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RelationshipTypeService.delete(req.params, req.user.id);
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

module.exports = RelationshipTypeController;
