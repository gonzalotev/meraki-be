const { WordCorrectorService } = include('services');
const toUpper = require('lodash/toUpper');

class WordCorrectorController {
    static async fetch(req, res, next) {
        try {
            const {page, search} = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const wordsCorrectors = await WordCorrectorService.fetch({page, search: searchValue});
            const total = await WordCorrectorService.getTotal({search: searchValue});
            res.send({ wordsCorrectors, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const wordCorrector = await WordCorrectorService.findOne(req.params);
            res.send({ wordCorrector });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const wordCorrector = await WordCorrectorService.create(req.body.corrector, req.user.id);
            res.status(201);
            res.send({ wordCorrector });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const wordCorrector = await WordCorrectorService.update(req.params, req.body.corrector);
            res.send({wordCorrector});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await WordCorrectorService.delete(req.params, req.user.id);
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
            const stream = await WordCorrectorService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = WordCorrectorController;
