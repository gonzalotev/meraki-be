const { MicroprocessesStepsOptionService } = include('services');
class MicroprocessesStepsOptionController {
    static async fetch(req, res, next) {
        try {
            const microprocesses = await MicroprocessesStepsOptionService.fetch();
            res.send({ microprocesses });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try {
            const microprocessStepOption = await MicroprocessesStepsOptionService.findOne(req.params);
            res.send({microprocessStepOption});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            const microprocessStepOption = await MicroprocessesStepsOptionService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessStepOption });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const microprocessStepOption = await MicroprocessesStepsOptionService.update(req.params, req.body);
            res.send({ success: true, microprocessStepOption });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await MicroprocessesStepsOptionService.delete(req.params, req.user.id);
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
            const microprocessStepOption = await MicroprocessesStepsOptionService.findById(req.params);
            res.send({ microprocessStepOption });
        } catch(error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await MicroprocessesStepsOptionService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesStepsOptionController;
