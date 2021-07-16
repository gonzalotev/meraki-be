const { AutoPhraseService } = include('services');
const toUpper = require('lodash/toUpper');

class AutoPhraseController {
    // static async fetch(req, res, next) {
    //     try {
    //         const autosPhrases = await AutoPhraseService.fetch(req.query);
    //         const total = await AutoPhraseService.getTotal({});
    //         res.send({ autosPhrases, total });
    //     } catch(error) {
    //         next(error);
    //     }
    // }
    static async fetch(req, res, next) {
        try {
            const {page, search} = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const autosPhrases = await AutoPhraseService.fetch({page, search: searchValue});
            const total = await AutoPhraseService.getTotal({search: searchValue});
            res.send({ autosPhrases, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const autoPhrase = await AutoPhraseService.findOne(req.params);
            res.send({ autoPhrase });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const autoPhrase = await AutoPhraseService.create(req.body, req.user.id);
            res.status(201);
            res.send({ autoPhrase });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const autoPhrase = await AutoPhraseService.update(req.params, req.body);
            res.send({autoPhrase});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await AutoPhraseService.delete(req.params, req.user.id);
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
            const stream = await AutoPhraseService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AutoPhraseController;
