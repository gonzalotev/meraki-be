const { DocumentTypeService } = include('services');

class DocumentTypeController {
    static async fetch(req, res, next) {
        try {
            const documentsTypes = await DocumentTypeService.fetch();
            res.send({ documentsTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const documentType = await DocumentTypeService.findOne(req.params);
            res.send({ documentType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const documentType = await DocumentTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ documentType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const documentType = await DocumentTypeService.update(req.params, req.body);
            res.send({documentType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await DocumentTypeService.delete(req.params, req.user.id);
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

module.exports = DocumentTypeController;
