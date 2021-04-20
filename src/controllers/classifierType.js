const { ClassifierTypeService } = include('services');

class ClassifierTypeController {
    static async fetch(req, res, next) {
        try {
            const classifiersTypes = await ClassifierTypeService.fetch();
            res.send({ classifiersTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const classifierType = await ClassifierTypeService.findOne(req.params);
            res.send({ classifierType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const classifierType = await ClassifierTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ classifierType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const classifierType = await ClassifierTypeService.update(req.params, req.body);
            res.send({classifierType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await ClassifierTypeService.delete(req.params, req.user.id);
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

module.exports = ClassifierTypeController;
