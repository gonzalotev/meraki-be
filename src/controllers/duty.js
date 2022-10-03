const {DutyService} = include('services');

class DutyController {
    static async fetch(req, res, next) {
        try {
            const duties = await DutyService.fetch();
            res.send({success: true, duties});
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const duty = await DutyService.findOne(req.params.id);
            res.send({duty});
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            await DutyService.deleteOne(req.params.id);
            res.send({success: true});
        }catch(error){
            next(error);
        }
    }

    static async create(req, res, next){
        try{
            const duty = await DutyService.create(req.body);
            res.send({duty, success: true});
        }catch(error){
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            await DutyService.update(req.params.id, req.body);
            res.send({ success: true});
        }catch(error){
            next(error);
        }
    }
}

module.exports = DutyController;
