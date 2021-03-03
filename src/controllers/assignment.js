const {AssignmentService} = include('services');
const {roles} = include('enums');

class AssignmentController {
    static async getAssignmentsByArea(req, res, next) {
        try {
            let subCoordinator;
            const role = req.user.roles[0];
            if (roles.SUB_COORDINATOR === role) {
                subCoordinator = req.user.id;
            }

            res.send(await AssignmentService.getAssignmentsByArea(req.query, subCoordinator));
        } catch(err) {
            next(err);
        }
    }

    static async getAssignmentsBySegment(req, res, next) {
        try {
            let subCoordinator;
            const role = req.user.roles[0];
            if (roles.SUB_COORDINATOR === role) {
                subCoordinator = req.user.id;
            }

            res.send(await AssignmentService.getAssignmentsBySegment(req.query, subCoordinator));
        } catch(err) {
            next(err);
        }
    }

    static async getAssignmentsByUps(req, res, next) {
        try {
            let subCoordinator;
            const role = req.user.roles[0];
            if (roles.SUB_COORDINATOR === role) {
                subCoordinator = req.user.id;
            }

            res.send(await AssignmentService.getAssignmentsByUps(req.query, subCoordinator));
        } catch(err) {
            next(err);
        }
    }

    static async getAssignmentsByAddress(req, res, next) {
        try {
            let subCoordinator;
            const role = req.user.roles[0];
            if (roles.SUB_COORDINATOR === role) {
                subCoordinator = req.user.id;
            }

            res.send(await AssignmentService.getAssignmentsByAddress(req.query, subCoordinator));
        } catch(err) {
            next(err);
        }
    }

    static async getAddressesToReassign(req, res, next) {
        try {
            const token = req.get('Authorization');
            let subCoordinator;
            const role = req.user.roles[0];
            if (roles.SUB_COORDINATOR === role) {
                subCoordinator = req.user.id;
            }

            return res.send(await AssignmentService.getAddressesToReassign(req.query, token, subCoordinator));
        } catch(err) {
            next(err);
        }
    }

    static async assignByArea(req, res, next) {
        try {
            await AssignmentService.assignByArea(req.body.assignments);
            return res.send({success: true});
        } catch(err) {
            next(err);
        }
    }

    static async assignBySegment(req, res, next) {
        try {
            await AssignmentService.assignBySegment(req.body.assignments);
            return res.send({success: true});
        } catch(err) {
            next(err);
        }
    }

    static async assignByAddress(req, res, next) {
        try {
            await AssignmentService.assignByAddress(req.body.assignments);
            return res.send({success: true});
        } catch(err) {
            next(err);
        }
    }

    static async reassignByAddress(req, res, next) {
        try {
            await AssignmentService.reassignByAddress(req.body.assignments);
            return res.send({success: true});
        } catch(err) {
            next(err);
        }
    }

    static async assignSubCoordinator(req, res, next) {
        try {
            await AssignmentService.assignSubCoordinator(req.body.assignments);
            return res.send({success: true});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AssignmentController;
