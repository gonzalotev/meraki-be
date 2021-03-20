const { Role } = include('models');
class RoleController {
    static async fetch(req, res, next) {
        try {
            const roles = await Role.find();
            res.send({ roles });
        } catch(error) {
            next(error);
        }
    }
    static async find(req, res, next){
        try{
            const role = await Role.findById(req.params);
            res.send({ role });
        } catch(error) {
            next(error);
        }
    }
    static async create(req, res, next){
        try {
            const userCreator = req.user.id;
            const role = await Role.insertOne(req.body, userCreator);
            res.send({ role });
        } catch(error) {
            next(error);
        }
    }
    static async update(req, res, next){
        try{
            const role = await Role.updateOne(req.params, req.body);
            res.send({ role });
        } catch(error) {
            next(error);
        }
    }
    static async delete(req, res, next){
        try{
            const userDestroyer = req.user.id;
            const result = await Role.deleteOne(req.params, userDestroyer);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }
}

module.exports = RoleController;
