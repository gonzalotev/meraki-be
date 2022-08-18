const {RoleService} = include('services');

class RoleController {
    static async fetch(req, res, next) {
        try {
            const roles = await RoleService.fetch();
            res.send(roles);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = RoleController;
