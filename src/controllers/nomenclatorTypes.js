const {NomenclatorTypesService} = include('services');
const {NomenclatorTypes} = include('models');
class NomenclatorTypesController {
    static async fetch(req, res, next) {
        try {
            const nomenclatorType = await NomenclatorTypes.findAll();
            res.send({ nomenclatorType });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try {
            const nomenclatorType = await NomenclatorTypesService.findOne(req.params);
            res.send({nomenclatorType});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            const nomenclatorType = await NomenclatorTypesService.create(req.body, req.user.id);
            res.send({ success: true, nomenclatorType });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const nomenclatorType = await NomenclatorTypesService.update(req.params, req.body);
            res.send({ success: true, nomenclatorType });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await NomenclatorTypesService.deleteOne(req.params, req.user.id);
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
            const nomenclatorType = await NomenclatorTypes.findById(req.params);
            res.send({ nomenclatorType });
        } catch(error) {
            next(error);
        }
    }

    static async fetchStaticNomenclatorTypes(req, res, next){
        try{
            const nomenclators = await NomenclatorTypesService.fetchStaticNomenclatorTypes();
            res.send({nomenclators});
        } catch(err){
            next(err);
        }
    }
}

module.exports = NomenclatorTypesController;
