const { StepsLinguisticProcessesService } = include('services');
class StepsLinguisticProcessesController {
    static async fetch(req, res, next) {
        try {
            const linguisticProcesses = await StepsLinguisticProcessesService.fetch();
            res.send({ linguisticProcesses });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try {
            const stepLinguisticProcess = await StepsLinguisticProcessesService.findOne(req.params);
            res.send({stepLinguisticProcess});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            const stepLinguisticProcess = await StepsLinguisticProcessesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ stepLinguisticProcess });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const stepLinguisticProcess = await StepsLinguisticProcessesService.update(req.params, req.body);
            res.send({ success: true, stepLinguisticProcess });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await StepsLinguisticProcessesService.delete(req.params, req.user.id);
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
            const stepLinguisticProcess = await StepsLinguisticProcessesService.findById(req.params);
            res.send({ stepLinguisticProcess });
        } catch(error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await StepsLinguisticProcessesService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = StepsLinguisticProcessesController;
