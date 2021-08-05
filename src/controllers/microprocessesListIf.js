const { microprocessesListIfService } = include('services');

class MicroprocessesListIfController {
    static async fetch(req, res, next) {
        try {
            const microprocessesListIf = await microprocessesListIfService.fetch(req.query, req.user.id);
            res.send({ microprocessesListIf });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesListIf = await microprocessesListIfService.findOne(req.params);
            res.send({ microprocessesListIf });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const microprocessesListIf = await microprocessesListIfService.create(req.body, req.user);
            res.status(201);
            res.send({ microprocessesListIf });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const microprocessesListIf = await microprocessesListIfService.update(req.params, req.body, req.user.id);
            res.send({microprocessesListIf});
        } catch(err){
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await microprocessesListIfService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesListIfController;
