const { MicroprocessesListIfService } = include('services');

class MicroprocessesListIfController {
    static async fetch(req, res, next) {
        try {
            const {page} = req.query;
            const microprocessesListIf = await MicroprocessesListIfService.fetch({page});
            const total = await MicroprocessesListIfService.getTotal();
            res.send({ microprocessesListIf, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesListIf = await MicroprocessesListIfService.findOne(req.params);
            res.send({ microprocessesListIf });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const microprocessesListIf = await MicroprocessesListIfService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessesListIf });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const microprocessesListIf = await MicroprocessesListIfService.update(req.params, req.body, req.user.id);
            res.send({microprocessesListIf});
        } catch(err){
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await MicroprocessesListIfService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesListIfController;
