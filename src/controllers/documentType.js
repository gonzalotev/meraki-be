const { DocumentTypeService } = include('services');

class DocumentTypeController {
    static async fetch(req, res, next) {
        try {
            const documents = await DocumentTypeService.fetch();
            res.send({ documents });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const document = await DocumentTypeService.findOne(req.params);
            res.send({ document });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const document = await DocumentTypeService.create(req.body, req.user.id);
            res.send({ success: true, document });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const document = await DocumentTypeService.update(req.params, req.body);
            res.send({success: true, document});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await DocumentTypeService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DocumentTypeController;
