const { MicroprocessDefinitionService } = include('services');
const isEmpty = require('lodash/isEmpty');

class MicroprocessDefinitionController {
    static async fetch(req, res, next) {
        try {
            const {page} = req.query;
            const microprocesses = await MicroprocessDefinitionService.fetch({page});
            const total = await MicroprocessDefinitionService.getTotal();
            res.send({ microprocesses, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try{
            const microprocess = await MicroprocessDefinitionService.findOne(req.params);
            res.send({microprocess});
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const foundMicroprocess= await MicroprocessDefinitionService.findOne({id: req.body.id});
            if (!isEmpty(foundMicroprocess)) {
                throw Error('Ya existe ese ID MICROPROCESO para una Definición de Microproceso. Por favor verifíquelo.');
            }
            const microprocess = await MicroprocessDefinitionService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocess });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const microprocess = await MicroprocessDefinitionService.update(req.params, req.body);
            res.send({microprocess});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await MicroprocessDefinitionService.delete(req.params, req.user.id);
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

module.exports = MicroprocessDefinitionController;
