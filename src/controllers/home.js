const {HomeService} = include('services');

class HomeController {
    static async fetch(req, res, next) {
        try {
            const home = await HomeService.fetch();
            res.send(home);
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const home = await HomeService.findOne(req.params);
            res.send(home);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await HomeService.deleteOne(req.params.idregist);
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
            const home = await HomeService.create(req.body);
            res.sendStatus(200);
            res.send(home);
        }catch(error){
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const home = await HomeService.update(req.body, req.params);
            res.sendStatus(200);
            res.send({home});
        }catch(error){
            next(error);
        }
    }
}

module.exports = HomeController;
