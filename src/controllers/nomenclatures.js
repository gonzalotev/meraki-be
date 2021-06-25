const {NomenclaturesService} = include('services');
const {Nomenclatures} = include('models');
class NomenclaturesController {
    static async fetch(req, res, next) {
        try {
            const nomenclatures = await Nomenclatures.find();
            res.send({ nomenclatures });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try{
            const nomenclature = await Nomenclatures.insertOne(req.body);
            res.send({ success: true, nomenclature });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const nomenclature = await Nomenclatures.updateOne(req.params, req.body);
            res.send({ success: true, nomenclature });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await Nomenclatures.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const nomenclature = await Nomenclatures.findById(req.params);
            res.send({ nomenclature });
        } catch(error) {
            next(error);
        }
    }
    static async fetchStaticNomenclatures(req, res, next){
        try{
            const nomenclatures = await NomenclaturesService.fetchStaticNomenclatures();
            res.send({nomenclatures});
        } catch(err){
            next(err);
        }
    }
}

module.exports = NomenclaturesController;
