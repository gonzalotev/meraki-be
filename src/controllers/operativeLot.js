const { OperativeLotService } = include('services');

class OperativeLotController {
    static async fetch(req, res, next) {
        try {
            const lots = await OperativeLotService.fetch();
            res.send({ lots });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const sperativeLot = await OperativeLotService.findOne(req.params);
            res.send({ sperativeLot });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const sperativeLot = await OperativeLotService.create(req.body, req.user.id);
            res.status(201);
            res.send({ sperativeLot });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const sperativeLot = await OperativeLotService.update(req.params, req.body);
            res.send({sperativeLot});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await OperativeLotService.delete(req.params, req.user.id);
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
            const stream = await OperativeLotService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = OperativeLotController;
