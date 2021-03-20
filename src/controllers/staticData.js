const assign = require('lodash/assign');
const { RoleTypeService } = include('services');

class StaticDataController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const {role} = req.query;
            if(role) {
                const roles = await RoleTypeService.find();
                assign(data, {roles});
            }
            res.send(data);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = StaticDataController;
