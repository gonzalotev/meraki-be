const { RoleType } = include('models');
const assign = require('lodash/assign');

class StaticController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const { role } = req.query;
            if(role){
                await RoleType.startTransaction();
                const roles = await RoleType.find();
                await RoleType.commitTransaction();
                assign(data, {roles});
            }
            res.send(data);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = StaticController;
