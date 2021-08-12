const {NomenclatorsGroupingsService} = include('services');
const {NomenclatorsGroupings} = include('models');
class NomenclatorsGroupingsController {
    static async fetch(req, res, next) {
        try {
            const nomenclatorsGroupings = await NomenclatorsGroupings.find();
            res.send({ nomenclatorsGroupings });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try{
            const nomenclatorsGrouping = await NomenclatorsGroupings.insertOne(req.body);
            res.send({ success: true, nomenclatorsGrouping });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const nomenclatorsGrouping = await NomenclatorsGroupings.updateOne(req.params, req.body);
            res.send({ success: true, nomenclatorsGrouping });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await NomenclatorsGroupings.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const nomenclatorsGrouping = await NomenclatorsGroupings.findById(req.params);
            res.send({ nomenclatorsGrouping });
        } catch(error) {
            next(error);
        }
    }
    static async fetchStaticNomenclatorsGroupings(req, res, next){
        try{
            const nomenclatorsGroupings = await NomenclatorsGroupingsService.fetchStaticNomenclatorsGroupings();
            res.send({nomenclatorsGroupings});
        } catch(err){
            next(err);
        }
    }
}

module.exports = NomenclatorsGroupingsController;
