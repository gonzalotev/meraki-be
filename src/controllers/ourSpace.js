const {ourSpaceService} = include('services');

class ourSpaceController {
    static async fetch(req, res, next) {
        try {
            const ourspace = await ourSpaceService.fetch();
            res.send(ourspace);
        } catch (error) {
            next(error);
        }
    }
    static async find(req, res, next) {
        try {
            const ourspace = await ourSpaceService.findOne(req.params);
            console.log(ourspace);
            res.send(ourspace);
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
            const ourspace = await ourSpaceService.create(req.body);
            res.sendStatus(200);
            res.send(ourspace);
        }catch(error){
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const ourspace = await ourSpaceService.update(req.body, req.params);
            res.sendStatus(200);
            res.send({ourspace});
        }catch(error){
            next(error);
        }
    }
}

module.exports = ourSpaceController;
