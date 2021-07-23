const { LotsService } = include('services');

class LotsController {
    static async fetch(req, res, next) {
        try {
            const lotss = await LotsService.fetch();
            res.send({ lotss });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try{
            const lot = await LotsService.insertOne(req.body);
            res.send({ success: true, lot });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const lot = await LotsService.updateOne(req.params, req.body);
            res.send({ success: true, lot });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await LotsService.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const lot = await LotsService.findById(req.params);
            res.send({ lot });
        } catch(error) {
            next(error);
        }
    }
    static async fetchStaticLots(req, res, next){
        try{
            const lots = await LotsService.fetchStaticLots();
            res.send({lots});
        }catch(err) {
            next(err);
        }
    }
}

module.exports = LotsController;
