const {UserRole} = include('models');

class UserRoleController {
    static async fetch(req, res, next) {
        try {
            const userRoles = await UserRole.findByPage(req.query.page);
            res.send({ userRoles });
        } catch(error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try{
            const userRole = await UserRole.insertOne(req.body);
            res.send({ sucess: true, userRole });
        } catch(error) {
            next(error);
        }
    }
    static async update(req, res, next){
        try{
            const userRole = await UserRole.updateOne(req.params, req.body);
            res.send({ sucess: true, userRole });
        } catch(error) {
            next(error);
        }
    }
    static async delete(req, res, next){
        try{
            const result = await UserRole.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }
}

module.exports = UserRoleController;
