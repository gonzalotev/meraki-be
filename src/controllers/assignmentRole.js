const { AssignmentRoleService } = include('services');

class AssignmentRoleController {
    static async fetch(req, res, next) {
        try {
            const assignmentsRoles = await AssignmentRoleService.fetch(req.query);
            const total = await AssignmentRoleService.getTotal({});
            res.send({ assignmentsRoles, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const assignmentRole = await AssignmentRoleService.findOne(req.params);
            res.send({ assignmentRole });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const assignmentRole = await AssignmentRoleService.create(req.body, req.user.id);
            res.status(201);
            res.send({ assignmentRole });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const assignmentRole = await AssignmentRoleService.update(req.params, req.body);
            res.send({assignmentRole});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await AssignmentRoleService.delete(req.params, req.user.id);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AssignmentRoleController;
