const { RelationshipTypeService } = include('services');

class RelationshipTypeController {
    static async fetch(req, res, next) {
        try {
            const relations = await RelationshipTypeService.fetch();
            res.send({ relations });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relation = await RelationshipTypeService.findOne(req.params);
            res.send({ relation });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relation = await RelationshipTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ relation });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const relation = await RelationshipTypeService.update(req.params, req.body);
            res.status(200);
            res.send({ relation });
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RelationshipTypeService.delete(req.params, req.user.id);
            success ? res.sendStatus(204) : res.sendStatus(400);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = RelationshipTypeController;
