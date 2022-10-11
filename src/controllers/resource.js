const {ResourceService} = include('services');

class ResourceController {
    static async fetchResource(req, res, next) {
        try {
            const resource = await ResourceService.fetchResource(req.params.id);
            res.send(resource);
        } catch (error) {
            next(error);
        }
    }

    static async deleteImage(req, res, next){
        try{
            const result = await ResourceService.imageDeleteOne(req.params.id);
            res.sendStatus(result ? 200 : 404);
        }catch(error){
            next(error);
        }
    }

    static async imageCreate(req, res, next){
        try{
            await ResourceService.imageCreate(req.body);
            res.send({success: true});
        }catch(error){
            next(error);
        }
    }

    static async imageUpdate(req, res, next){
        try{
            const result = await ResourceService.imageUpdate(req.params.id, req.body);
            res.sendStatus(result ? 200 : 404);
        }catch(error){
            next(error);
        }
    }
}

module.exports = ResourceController;
