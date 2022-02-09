const { UniqueWordsAndPhrasesService } = include('services');
const { decodeQuery } = include('util');
class UniqueWordsAndPhrasesController {
    static async getLotsVariables(req, res, next){
        try{
            const query = decodeQuery(req.query);
            const lotsVariables = await UniqueWordsAndPhrasesService.getLotsVariables(query);
            res.send({lotsVariables});
        } catch(error){
            next(error);
        }
    }

    static async runProcess(req, res, next){
        try{
            const { operativeId, lotId, variableId } = req.params;
            const plSqlresponse = await UniqueWordsAndPhrasesService.runProcess(
                { lotId, operativeId, variableId }
            );
            if (plSqlresponse) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        }catch(error){
            next(error);
        }
    }
}

module.exports = UniqueWordsAndPhrasesController;
