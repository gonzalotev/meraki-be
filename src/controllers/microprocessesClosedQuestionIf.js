const { MicroprocessesClosedQuestionIfService } = include('services');

class MicroprocessesClosedQuestionIfController {
    static async fetch(req, res, next) {
        try {
            const {page, id} = req.query;
            // eslint-disable-next-line max-len
            const microprocessesClosedQuestionIf = await MicroprocessesClosedQuestionIfService.fetch({page, id});
            const total = await MicroprocessesClosedQuestionIfService.getTotal({id});
            res.send({ microprocessesClosedQuestionIf, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            console.log(req.params);
            const microprocessesClosedQuestionIf = await MicroprocessesClosedQuestionIfService.findOne(req.params);
            res.send({ microprocessesClosedQuestionIf });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            // eslint-disable-next-line max-len
            const microprocessesClosedQuestionIf = await MicroprocessesClosedQuestionIfService.create(req.body, req.user);
            res.status(201);
            res.send({ microprocessesClosedQuestionIf });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            // eslint-disable-next-line max-len
            const microprocessesClosedQuestionIf = await MicroprocessesClosedQuestionIfService.update(req.params, req.body, req.user.id);
            res.send({microprocessesClosedQuestionIf});
        } catch(err){
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await MicroprocessesClosedQuestionIfService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
    static async delete(req, res, next){
        try {
            const success = await MicroprocessesClosedQuestionIfService.delete(req.params);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesClosedQuestionIfController;
