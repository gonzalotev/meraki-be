const {Nomenclators} = include('models');

class NomenclatorsController {
    static async fetch(req, res, next) {
        try {
            const nomenclators = await Nomenclators.find();
            res.send({ nomenclators });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try{
            const nomenclator = await Nomenclators.insertOne(req.body);
            res.send({ success: true, nomenclator });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const nomenclator = await Nomenclators.updateOne(req.params, req.body);
            res.send({ success: true, nomenclator });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await Nomenclators.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const nomenclator = await Nomenclators.findById(req.params);
            res.send({ nomenclator });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = NomenclatorsController;
