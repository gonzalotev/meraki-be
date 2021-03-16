const assign = require('lodash/assign');
const { RoleTypeService } = include('services');
class StaticController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const { role } = req.query;
            if(role){
                const roles = await RoleTypeService.find();
                assign(data, {roles});
            }
            res.send(data);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = StaticController;
