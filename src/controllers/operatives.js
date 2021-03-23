const { OperativesService } = include('services');

class OperativesController {
    static async fetch(req, res, next){
        try {
            const operatives = await OperativesService.find();
            res.send({ operatives });
        } catch(err) {
            next(err);
        }
    }

    static async find(req, res, next){
        try {
            const operative = await OperativesService.findOne(req.params);
            res.send({operative});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            const operative = await OperativesService.create(req.body, req.user.id);
            res.send({success: true, operative});
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const operative = await OperativesService.update(req.params, req.body);
            res.send({success: true, operative});
        } catch(err){
            next(err);
        }
    }
}

module.exports = OperativesController;
