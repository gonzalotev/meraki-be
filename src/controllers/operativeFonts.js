const {OperativeFontsService} = include('services');
const {OperativeFonts} = include('models');
class OperativeFontsController {
    static async fetch(req, res, next) {
        try {
            const operativeFonts = await OperativeFonts.find();
            res.send({ operativeFonts });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try{
            const operativeFont = await OperativeFonts.insertOne(req.body);
            res.send({ success: true, operativeFont });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const operativeFont = await OperativeFonts.updateOne(req.params, req.body);
            res.send({ success: true, operativeFont });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await OperativeFonts.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const operativeFont = await OperativeFonts.findById(req.params);
            res.send({ operativeFont });
        } catch(error) {
            next(error);
        }
    }
    static async fetchStaticOperativeFonts(req, res, next){
        try{
            const operativeFonts = await OperativeFontsService.fetchStaticOperativeFonts();
            res.send({operativeFonts});
        } catch(err){
            next(err);
        }
    }
}

module.exports = OperativeFontsController;
