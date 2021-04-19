const { StatisticalVariableService } = include('services');

class StatisticalVariableController {
    static async fetch(req, res, next){
        try {
            const statisticalVariables = await StatisticalVariableService.fetch();
            res.send({statisticalVariables});
        } catch(err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next){
        try {
            const variable = await StatisticalVariableService.findOne(req.params);
            res.send({variable});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            const statisticalVariable = await StatisticalVariableService.create(req.body, req.user.id);
            res.send({success: true, statisticalVariable});
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const statisticalVariable = await StatisticalVariableService.update(req.params, req.body);
            res.send({success: true, statisticalVariable});
        } catch(err){
            next(err);
        }
    }
    static async fetchStaticVariables(req, res, next){
        try{
            const statisticalVariables = await StatisticalVariableService.fetchStaticVariables();
            res.send({statisticalVariables});
        }catch(err){
            next(err);
        }
    }
}

module.exports = StatisticalVariableController;
