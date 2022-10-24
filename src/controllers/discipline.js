const {TopicsService} = include('services');

class DisciplineController {
    static async create(req, res, next){
        try{
            const discipline = await TopicsService.create(req.body);
            res.send({discipline, success: true});
        }catch(error){
            next(error);
        }
    }
}

module.exports = DisciplineController;
