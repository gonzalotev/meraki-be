const { AssignmentRolesNomenclatorService } = include('services');

class AssignmentRolesNomenclatorController {
    static async fetch(req, res, next) {
        try {
            const { page } = req.query;
            const assignmentsRolesNomenclators = await AssignmentRolesNomenclatorService.fetch({ page });
            const total = await AssignmentRolesNomenclatorService.getTotal({});
            res.send({ assignmentsRolesNomenclators, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const assignmentRolesNomenclator = await AssignmentRolesNomenclatorService.findOne(req.params);
            res.send({ assignmentRolesNomenclator });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const assignmentRolesNomenclator = await AssignmentRolesNomenclatorService.create(req.body, req.user.id);
            res.status(201);
            res.send({ assignmentRolesNomenclator });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const assignmentRolesNomenclator = await AssignmentRolesNomenclatorService.update(req.params, req.body);
            res.send({assignmentRolesNomenclator});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await AssignmentRolesNomenclatorService.delete(req.params, req.user.id);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static async getRoles(req, res, next){
        try {
            const { userId, assigned, nomenclatorId } = req.query;
            const roles = await AssignmentRolesNomenclatorService.fetchRoles({ userId, assigned, nomenclatorId });
            res.send({ roles });
        } catch(err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await AssignmentRolesNomenclatorService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AssignmentRolesNomenclatorController;
