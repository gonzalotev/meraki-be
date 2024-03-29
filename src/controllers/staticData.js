const {RoleService, TopicsService} = include('services');

class StaticDataController {
    static async fetch(req, res, next) {
        try {
            const roles = await RoleService.fetch();
            const topics = await TopicsService.fetch();
            res.send({success: true, roles, topics});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StaticDataController;
