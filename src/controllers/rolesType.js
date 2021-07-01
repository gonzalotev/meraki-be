const { RolesTypeService } = include('services');

class RolesTypeController {
    static async fetch(req, res, next) {
        try {
            const rolessTypes = await RolesTypeService.fetch();
            res.send({ rolessTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const rolesType = await RolesTypeService.findOne(req.params);
            res.send({ rolesType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const rolesType = await RolesTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ rolesType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const rolesType = await RolesTypeService.update(req.params, req.body);
            res.send({rolesType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RolesTypeService.delete(req.params, req.user.id);
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
            const stream = await RolesTypeService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = RolesTypeController;
