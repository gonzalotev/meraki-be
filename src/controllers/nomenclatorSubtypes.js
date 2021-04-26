const { NomenclatorSubtypesService } = include('services');

class NomenclatorSubtypeController {
    static async fetch(req, res, next) {
        try {
            const nomenclators = await NomenclatorSubtypesService.fetch();
            res.send({ nomenclators });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const nomeclator = await NomenclatorSubtypesService.findOne(req.params);
            res.send({ nomeclator });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const nomeclator = await NomenclatorSubtypesService.create(req.body, req.user.id);
            res.send({ success: true, nomeclator });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const nomeclator = await NomenclatorSubtypesService.update(req.params, req.body);
            res.send({success: true, nomeclator});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await NomenclatorSubtypesService.delete(req.params, req.user.id);
            if (success){
                res.sendStatus(204);
            }else{
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = NomenclatorSubtypeController;
