const { OperativeStructureService } = include('services');

class OperativeStructureController {
    static async fetch(req, res, next) {
        try {
            const {page} = req.query;
            const operativesStructures = await OperativeStructureService.fetch({page});
            const total = await OperativeStructureService.getTotal();
            res.send({ operativesStructures, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try{
            const operativeStructure = await OperativeStructureService.findOne(req.params);
            res.send({operativeStructure});
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const operativeStructure = await OperativeStructureService.create(req.body, req.user.id);
            res.status(201);
            res.send({ operativeStructure });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const operativeStructure = await OperativeStructureService.update(req.params, req.body);
            res.send({operativeStructure});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await OperativeStructureService.delete(req.params, req.user.id);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await OperativeStructureService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = OperativeStructureController;
