const {MicroprocessStepsService} = include('services');

class MicroprocessStepsController {
    static async fetchSteps(req, res, next) {
        try {
            const {page} = req.query;
            const microprocessSteps = await MicroprocessStepsService.fetch({page});
            const total = await MicroprocessStepsService.getTotal();
            res.send({ microprocessSteps, total });
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            const microprocessStep = await MicroprocessStepsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessStep });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const microprocessStep = await MicroprocessStepsService.update(req.params, req.body);
            res.send({microprocessStep});
        } catch(err){
            next(err);
        }
    }

    static async find(req, res, next) {
        try{
            const microprocessStep = await MicroprocessStepsService.findOne(req.params);
            res.send({microprocessStep});
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await MicroprocessStepsService.delete(req.params);
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

module.exports = MicroprocessStepsController;
