const {ourSpaceService} = include('services');

class ourSpaceController {
    static async fetch(req, res, next) {
        try {
            const ourSpace = await ourSpaceService.fetch();
            res.send(ourSpace);
        } catch (error) {
            next(error);
        }
    }
    static async find(req, res, next) {
        try {
            const ourSpace = await ourSpaceService.findOne(req.params);
            res.send(ourSpace);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await ourSpaceService.deleteOne(req.params.idregist);
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
            const ourSpace = await ourSpaceService.create(req.body);
            res.sendStatus(200);
            res.send(ourSpace);
        }catch(error){
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const ourSpace = await ourSpaceService.update(req.body, req.params);
            res.sendStatus(200);
            res.send({ourSpace});
        }catch(error){
            next(error);
        }
    }
}

module.exports = ourSpaceController;
