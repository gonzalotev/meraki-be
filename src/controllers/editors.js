const { EditorsService } = include('services');

class DocumentTypeController {
    static async fetch(req, res, next) {
        try {
            const editors = await EditorsService.fetch();
            res.send({ editors });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const editor = await EditorsService.findOne(req.params);
            res.send({ editor });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const editor = await EditorsService.create(req.body, req.user.id);
            res.send({ success: true, editor });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const editor = await EditorsService.update(req.params, req.body);
            res.send({success: true, editor});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await EditorsService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DocumentTypeController;
