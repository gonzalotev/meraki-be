const { OrganizationTypeService } = include('services');

class OrganizationTypeController {
    static async fetch(req, res, next) {
        try {
            const organizationsTypes = await OrganizationTypeService.fetch();
            res.send({ organizationsTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const organizationType = await OrganizationTypeService.findOne(req.params);
            res.send({ organizationType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const organizationType = await OrganizationTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ organizationType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const organizationType = await OrganizationTypeService.update(req.params, req.body);
            res.send({organizationType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await OrganizationTypeService.delete(req.params, req.user.id);
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
            const stream = await OrganizationTypeService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = OrganizationTypeController;
