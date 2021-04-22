const { NetworkTypeService } = include('services');
const { networkType: networkTypeModel } = include('models');
const knex = include('helpers/database');

class NetworkTypeController {
    static async fetch(req, res, next) {
        try {
            const networks = await knex.select().table('TIPOS_DE_RED');
            //const networksTypes = await NetworkTypeService.fetch();
            res.send({ networks, table: networkTypeModel.tableName });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const networkType = await NetworkTypeService.findOne(req.params);
            res.send({ networkType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const networkType = await NetworkTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ networkType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const networkType = await NetworkTypeService.update(req.params, req.body);
            res.send({networkType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await NetworkTypeService.delete(req.params, req.user.id);
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

module.exports = NetworkTypeController;
