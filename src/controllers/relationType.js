const { RelationTypeService } = include('services');

class RelationTypeController {
    static async fetch(req, res, next) {
        try {
            const relations = await RelationTypeService.fetch();
            res.send({ relations });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relation = await RelationTypeService.findOne(req.params);
            res.send({ relation });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relation = await RelationTypeService.create(req.body, req.user.id);
            res.send({ success: true, relation });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const relation = await RelationTypeService.update(req.params, req.body);
            res.send({success: true, relation});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RelationTypeService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = RelationTypeController;
