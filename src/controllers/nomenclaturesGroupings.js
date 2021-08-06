const {NomenclaturesGroupingsService} = include('services');
const {NomenclaturesGroupings} = include('models');
class NomenclaturesGroupingsController {
    static async fetch(req, res, next) {
        try {
            const nomenclaturesGroupings = await NomenclaturesGroupings.find();
            res.send({ nomenclaturesGroupings });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try{
            const nomenclatorsGrouping = await NomenclaturesGroupings.insertOne(req.body);
            res.send({ success: true, nomenclatorsGrouping });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const nomenclatorsGrouping = await NomenclaturesGroupings.updateOne(req.params, req.body);
            res.send({ success: true, nomenclatorsGrouping });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await NomenclaturesGroupings.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const nomenclatorsGrouping = await NomenclaturesGroupings.findById(req.params);
            res.send({ nomenclatorsGrouping });
        } catch(error) {
            next(error);
        }
    }
    static async fetchStaticNomenclaturesGroupings(req, res, next){
        try{
            const nomenclaturesGroupings = await NomenclaturesGroupingsService.fetchStaticNomenclaturesGroupings();
            res.send({nomenclaturesGroupings});
        } catch(err){
            next(err);
        }
    }
}

module.exports = NomenclaturesGroupingsController;
