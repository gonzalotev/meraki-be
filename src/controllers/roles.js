const { RolesService } = include('services');

class RolesController {
    static async fetch(req, res, next) {
        try {
            const roles = await RolesService.fetch();
            res.send({ roles });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try{
            const role = await RolesService.findOne(req.params);
            res.send({ role });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const userCreator = req.user.id;
            const role = await RolesService.create(req.body, userCreator);
            res.send({ success: true, role });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const role = await RolesService.update(req.params, req.body);
            res.send({ role });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const userDeleted = req.user.id;
            const success = await RolesService.delete(req.params, userDeleted);
            res.send({ success });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = RolesController;
