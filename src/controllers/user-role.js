const { UserRoleService } = include('services');
class UserRoleController {
    static async fetch(req, res, next) {
        try {
            const userRoles = await UserRoleService.find(req.query.page);
            res.send({ userRoles });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = UserRoleController;
