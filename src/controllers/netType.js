const { NetTypeService } = include('services');

class NetTypeController {
    static async fetch(req, res, next) {
        try {

            console.log('estoy en net');
            const nets = await NetTypeService.fetch();
            res.send({ nets });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            console.log('estoy en net');
            const net = await NetTypeService.findOne(req.params);
            res.send({ net });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const net = await NetTypeService.create(req.body, req.user.id);
            res.send({ success: true, net });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const net = await NetTypeService.update(req.params, req.body);
            res.send({success: true, net});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await NetTypeService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = NetTypeController;
