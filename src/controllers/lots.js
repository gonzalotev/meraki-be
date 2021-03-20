const {Lots} = include('models');

class LotsController {
    static async fetch(req, res, next) {
        try {
            const lots = await Lots.find();
            res.send({ lots });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try{
            const lot = await Lots.insertOne(req.body);
            res.send({ success: true, lot });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const lot = await Lots.updateOne(req.params, req.body);
            res.send({ success: true, lot });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await Lots.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const lot = await Lots.findById(req.params);
            res.send({ lot });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = LotsController;
