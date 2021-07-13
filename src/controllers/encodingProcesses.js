const { EncodingProcessesService } = include('services');

class EncodingProcessesController {
    static async fetch(req, res, next) {
        try {
            const encodingProcesses = await EncodingProcessesService.fetch();
            res.send({ encodingProcesses });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const encodingProcess = await EncodingProcessesService.findOne(req.params);
            res.send({ encodingProcess });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const encodingProcess = await EncodingProcessesService.create(req.body, req.user.id);
            res.send({ success: true, encodingProcess });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const encodingProcess = await EncodingProcessesService.update(req.params, req.body);
            res.send({success: true, encodingProcess});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await EncodingProcessesService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = EncodingProcessesController;
