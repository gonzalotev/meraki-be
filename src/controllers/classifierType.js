const { ClassifierTypeService } = include('services');

class ClassifierTypeController {
    static async fetch(req, res, next) {
        try {
            const classifierTypes = await ClassifierTypeService.fetch();
            res.send({ classifierTypes });
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
            res.send({ success: true, classifierType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const classifierType = await ClassifierTypeService.update(req.params, req.body);
            res.send({success: true, classifierType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await ClassifierTypeService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = ClassifierTypeController;
