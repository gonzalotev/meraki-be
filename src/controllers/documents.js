const { DocumentsService } = include('services');

class DocumentsController {
    static async fetch(req, res, next) {
        try {
            const documents = await DocumentsService.fetch();
            res.send({ documents });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const document = await DocumentsService.findOne(req.params);
            res.send({ document });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const document = await DocumentsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ document });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const document = await DocumentsService.update(req.params, req.body);
            res.send({document});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await DocumentsService.delete(req.params, req.user.id);
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
            const stream = await DocumentsService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DocumentsController;
