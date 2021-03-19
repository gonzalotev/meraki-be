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
    static async create(req, res, next){
        try {
            const userCreator = req.user.id;
            const role = await Role.insertOne(req.body, userCreator);
            res.send({ role });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = RoleController;
