const {VariableStadistics} = include('models');

class VariableStadisticsController {
    static async fetch(req, res, next) {
        try {
            const variablesStadistics = await VariableStadistics.find();
            res.send({ variablesStadistics });
        } catch(error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try{
            const variableStadistics = await VariableStadistics.insertOne(req.body);
            res.send({ sucess: true, variableStadistics });
        } catch(error) {
            next(error);
        }
    }
    static async update(req, res, next){
        try{
            const variableStadistics = await VariableStadistics.updateOne(req.params, req.body);
            res.send({ sucess: true, variableStadistics });
        } catch(error) {
            next(error);
        }
    }
    static async delete(req, res, next){
        try{
            const result = await VariableStadistics.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }
    static async fetchOne(req, res, next){
        try{
            const variableStadistics = await VariableStadistics.findById(req.params);
            res.send({ variableStadistics });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = VariableStadisticsController;
