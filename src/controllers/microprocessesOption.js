const { MicroprocessesOptionService } = include('services');

class MicroprocessesOptionController {
    static async fetch(req, res, next) {
        try {
            const {page} = req.query;
            const microprocessesOption = await MicroprocessesOptionService.fetch({page});
            const total = await MicroprocessesOptionService.getTotal();
            res.send({ microprocessesOption, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesOption = await MicroprocessesOptionService.findOne(req.params);
            res.send({ microprocessesOption });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const microprocessesOption = await MicroprocessesOptionService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessesOption });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const microprocessesOption = await MicroprocessesOptionService.update(req.params, req.body, req.user.id);
            res.send({microprocessesOption});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await MicroprocessesOptionService.delete(req.params, req.user.id);
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
            const stream = await MicroprocessesOptionService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesOptionController;
