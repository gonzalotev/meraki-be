const {operativeSourcesService } = include('services');
const {OperativeSources} = include('models');
class OperativeSourcesController {
    static async fetch(req, res, next) {
        try {
            const operativeSources = await OperativeSources.findAll();
            res.send({ operativeSources });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try {
            const operativeSources = await operativeSourcesService.findOne(req.params);
            res.send({operativeSources});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            const operativeSources = await operativeSourcesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ operativeSources });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const operativeSources = await operativeSourcesService.update(req.params, req.body);
            res.send({ success: true, operativeSources });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await operativeSourcesService.deleteOne(req.params, req.user.id);
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
            const operativeSource = await operativeSourcesService.findById(req.params);
            res.send({ operativeSource });
        } catch(error) {
            next(error);
        }
    }

}

module.exports = OperativeSourcesController;
