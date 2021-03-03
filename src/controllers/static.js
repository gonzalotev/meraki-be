const {ArqService} = include('services');
const get = require('lodash/get');
const head = require('lodash/head');
const includes = require('lodash/includes');
const filter = require('lodash/filter');

const {states} = include('enums');

class StaticData {
    static async getStaticData(req, res, next) {
        try {
            const components = include('openapi/components');
            const rolesArq = await ArqService.getAppRoles(req.get('Authorization'));
            const assignmentType = get(await ArqService.getAppAssignmentType(req.get('Authorization')), 'assignmentType.ug', {});
            res.send({
                states,
                swagger: {components},
                roles: rolesArq,
                assignmentType: filter(assignmentType, at=>includes(at.managers, head(req.user.roles)))
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = StaticData;
