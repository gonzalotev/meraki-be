const {StatisticalVariable} = include('models');

class StatisticalVariableController {
    static async fetch(req, res, next) {
        try {
            const statisticalsVariables = await StatisticalVariable.findByPage(req.query.page);
            res.send({ statisticalsVariables });
        } catch(error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try{
            const statisticalVariable = await StatisticalVariable.insertOne(req.body);
            res.send({ sucess: true, statisticalVariable });
        } catch(error) {
            next(error);
        }
    }
    static async update(req, res, next){
        try{
            const statisticalVariable = await StatisticalVariable.updateOne(req.params, req.body);
            res.send({ sucess: true, statisticalVariable });
        } catch(error) {
            next(error);
        }
    }
    static async delete(req, res, next){
        try{
            const result = await StatisticalVariable.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }
    static async fetchOne(req, res, next){
        try{
            const statisticalVariable = await StatisticalVariable.findById(req.params);
            res.send({ statisticalVariable });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = StatisticalVariableController;
