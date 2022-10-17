const {ProtocolService} = include('services');

class ProtocolController {
    static async fetch(req, res, next) {
        try {
            const protocol = await ProtocolService.fetch();
            res.send(protocol);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            await ProtocolService.update(req.body);
            res.send({success: true});
        }catch(error){
            next(error);
        }
    }
}

module.exports = ProtocolController;
