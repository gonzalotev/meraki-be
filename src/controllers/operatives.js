const { OperativesService } = include('services');
class OperativesController {
    static async fetch(req, res, next) {
        try {
            const operativesss = await OperativesService.fetch();
            res.send({ operativesss });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try {
            const operatives = await OperativesService.findOne(req.params);
            res.send({operatives});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            const operatives = await OperativesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ operatives });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const operatives = await OperativesService.update(req.params, req.body);
            res.send({ success: true, operatives });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await OperativesService.deleteOne(req.params, req.user.id);
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
            const operative = await OperativesService.findById(req.params);
            res.send({ operative });
        } catch(error) {
            next(error);
        }
    }

}

module.exports = OperativesController;
