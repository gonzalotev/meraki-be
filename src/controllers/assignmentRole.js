const { AssignmentRoleService } = include('services');

class AssignmentRoleController {
    static async fetch(req, res, next) {
        try {
            const token = req.get('Authorization');
            const { page } = req.query;
            const assignmentsRoles = await AssignmentRoleService.fetch({ page, token });
            const total = await AssignmentRoleService.getTotal();
            res.send({ assignmentsRoles, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const { roleId, userId } = req.params;
            const assignmentRole = await AssignmentRoleService.findOne({ roleId, userId });
            res.send({ assignmentRole });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const assignmentRole = await AssignmentRoleService.create(req.body);
            res.status(201);
            res.send({ assignmentRole });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const { roleId, userId } = req.params;
            const assignmentRole = await AssignmentRoleService.update({ roleId, userId }, req.body);
            res.send({assignmentRole});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const { roleId, userId } = req.params;
            const success = await AssignmentRoleService.delete({ roleId, userId });
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await AssignmentRoleService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }

    static async getRoles(req, res, next){
        try {
            const { userId, assigned } = req.query;
            const roles = await AssignmentRoleService.fetchRoles({ userId, assigned });
            res.send({ roles });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AssignmentRoleController;
