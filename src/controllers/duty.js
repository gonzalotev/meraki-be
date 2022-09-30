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
            const duty = await DutyService.findOne(req.params);
            res.send(duty);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await DutyService.deleteOne(req.params.idDuty);
            if(result){
                res.sendStatus(200);
            }else{
                res.sendStatus(400);
            }
        }catch(error){
            next(error);
        }
    }

    static async create(req, res, next){
        try{
            const duty = await DutyService.create(req.body);
            res.sendStatus(200);
            res.send(duty);
        }catch(error){
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const duty = await DutyService.update(req.body, req.params);
            res.sendStatus(200);
            res.send({duty});
        }catch(error){
            next(error);
        }
    }
}

module.exports = DutyController;
