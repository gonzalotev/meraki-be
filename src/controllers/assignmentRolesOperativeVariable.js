const { AssignmentRolesOperativeVariableService } = include('services');

class AssignmentRolesOperativeVariableController {
    static async fetch(req, res, next) {
        try {
            const assignmentsRolesOperativeVariables = await AssignmentRolesOperativeVariableService.fetch(req.query);
            const total = await AssignmentRolesOperativeVariableService.getTotal({});
            res.send({ assignmentsRolesOperativeVariables, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const assignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableService.findOne(req.params);
            res.send({ assignmentRolesOperativeVariable });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const assignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ assignmentRolesOperativeVariable });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const assignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableService.
                update(req.params, req.body);
            res.send({assignmentRolesOperativeVariable});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await AssignmentRolesOperativeVariableService.delete(req.params, req.user.id);
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
            const stream = await AssignmentRolesOperativeVariableService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AssignmentRolesOperativeVariableController;
