const { OperativeSourcesService } = include('services');
class OperativeSourcesController {
    static async fetch(req, res, next) {
        try {
            const operativesSources = await OperativeSourcesService.fetch();
            res.send({ operativesSources });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try {
            const operativeSource = await OperativeSourcesService.findOne(req.params);
            res.send({operativeSource});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            const operativeSources = await OperativeSourcesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ operativeSources });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const operativeSources = await OperativeSourcesService.update(req.params, req.body);
            res.send({ success: true, operativeSources });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await OperativeSourcesService.deleteOne(req.params, req.user.id);
            if(result){
                res.sendStatus(204);
            }else{
                res.sendStatus(400);
            }
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const operativeSource = await OperativeSourcesService.findById(req.params);
            res.send({ operativeSource });
        } catch(error) {
            next(error);
        }
    }

}

module.exports = OperativeSourcesController;
