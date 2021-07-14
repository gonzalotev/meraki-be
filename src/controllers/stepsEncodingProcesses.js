const { StepsEncodingProcessesService } = include('services');
class StepsEncodingProcessesController {
    static async fetch(req, res, next) {
        try {
            const stepsEncodingProcesses = await StepsEncodingProcessesService.fetch();
            res.send({ stepsEncodingProcesses });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try {
            const stepEncodingProcess = await StepsEncodingProcessesService.findOne(req.params);
            res.send({stepEncodingProcess});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            const stepEncodingProcess = await StepsEncodingProcessesService.create(req.body, req.user.id);
            console.log('controller stepEncodingProcess');
            console.log(stepEncodingProcess);
            res.status(201);
            res.send({ stepEncodingProcess });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const stepEncodingProcess = await StepsEncodingProcessesService.update(req.params, req.body);
            res.send({ success: true, stepEncodingProcess });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await StepsEncodingProcessesService.delete(req.params, req.user.id);
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
            const stepEncodingProcess = await StepsEncodingProcessesService.findById(req.params);
            res.send({ stepEncodingProcess });
        } catch(error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await StepsEncodingProcessesService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = StepsEncodingProcessesController;
