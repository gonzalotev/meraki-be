const {TypeService} = include('services');

class TypeController {
    static async getUps(req, res, next) {
        try {
            res.send(await TypeService.getUps(req.params.state));
        } catch(err) {
            next(err);
        }
    }

    static async getAreas(req, res, next) {
        try {
            res.send(await TypeService.getAreas(req.params.state, req.params.ups));
        } catch (err) {
            next(err);
        }
    }

    static async getSegments(req, res, next) {
        try {
            res.send(await TypeService.getSegments(req.params.state, req.params.ups, req.params.area));
        } catch(err) {
            next(err);
        }
    }

    static async getFiles(req, res, next) {
        try {
            res.send(await TypeService.getFiles());
        } catch(err) {
            next(err);
        }
    }

    static async getStatuses(req, res, next) {
        try {
            res.send(await TypeService.getStatuses());
        } catch(err) {
            next(err);
        }
    }

    static async getAssignmentsTypes(req, res, next) {
        try {
            res.send(await TypeService.getAssignmentsTypes());
        } catch(err) {
            next(err);
        }
    }

    static async getSituations(req, res, next) {
        try {
            res.send(await TypeService.getSituations(req.params.status));
        } catch(err) {
            next(err);
        }
    }
}

module.exports = TypeController;
