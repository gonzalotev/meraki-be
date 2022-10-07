const {InscriptionService} = include('services');

class InscriptionController {
    static async fetch(req, res, next) {
        try {
            const inscriptions = await InscriptionService.fetch();
            res.send({success: true, inscriptions});
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            await InscriptionService.deleteOne(req.params.id);
            res.send({success: true});
        }catch(error){
            next(error);
        }
    }

    static async create(req, res, next){
        try{
            const inscription = await InscriptionService.create(req.body);
            res.send({inscription, success: true});
        }catch(error){
            next(error);
        }
    }

}

module.exports = InscriptionController;
