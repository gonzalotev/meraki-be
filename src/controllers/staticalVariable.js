const { StaticalVariableService } = include('services');

class StaticalVariableController {
    static async fetch(req, res, next) {
        try {
            const staticalsVariables = await StaticalVariableService.fetch();
            res.send({ staticalsVariables });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const staticalVariable = await StaticalVariableService.findOne(req.params);
            res.send({ staticalVariable });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const staticalVariable = await StaticalVariableService.create(req.body, req.user.id);
            res.status(201);
            res.send({ staticalVariable });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const staticalVariable = await StaticalVariableService.update(req.params, req.body);
            res.send({staticalVariable});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await StaticalVariableService.delete(req.params, req.user.id);
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
            const stream = await StaticalVariableService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = StaticalVariableController;
