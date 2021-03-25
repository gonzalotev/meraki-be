const { roles } = include('models');
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
            const role = await roles.findById(req.params);
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
            const role = await roles.updateOne(req.params, req.body);
            res.send({ role });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const userDestroyer = req.user.id;
            const result = await roles.deleteOne(req.params, userDestroyer);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }
}

module.exports = RolesController;
