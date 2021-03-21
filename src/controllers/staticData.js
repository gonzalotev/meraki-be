const assign = require('lodash/assign');
const { RolesService } = include('services');

class StaticDataController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const {roles} = req.query;
            if(roles) {
                const roles = await RolesService.fetch();
                assign(data, {roles});
            }
            res.send(data);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = StaticDataController;
