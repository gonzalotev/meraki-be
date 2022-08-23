const {ProtocolService} = include('services');

class ProtocolController {
    static async fetch(req, res, next) {
        try {
            const protocols = await ProtocolService.fetch();
            console.log(protocols);
            res.send(protocols);
        } catch (error) {
            next(error);
        }
    }
    static async find(req, res, next) {
        try {
            const protocol = await ProtocolService.findOne(req.params);
            console.log(protocol);
            res.send(protocol);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await ProtocolService.deleteOne(req.params.serialKey);
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
            const protocol = await ProtocolService.create(req.body);
            res.sendStatus(200);
            res.send(protocol);
        }catch(error){
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const protocol = await ProtocolService.update(req.body, req.params);
            res.sendStatus(200);
            res.send({protocol});
        }catch(error){
            next(error);
        }
    }
}

module.exports = ProtocolController;
