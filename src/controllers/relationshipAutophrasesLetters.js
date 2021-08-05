const { RelationshipAutophrasesLettersService } = include('services');
const toUpper = require('lodash/toUpper');

class RelationshipAutophrasesLetterController {
    static async fetch(req, res, next) {
        try {
            const {page, search} = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const relationshipsLetter = await RelationshipAutophrasesLettersService.fetch({page, search: searchValue});
            const total = await RelationshipAutophrasesLettersService.getTotal({search: searchValue});
            res.send({ relationshipsLetter, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipAutophrasesLetter = await RelationshipAutophrasesLettersService.
                findOne(req.params);
            res.send({ relationshipAutophrasesLetter });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relationshipAutophrasesLetter = await RelationshipAutophrasesLettersService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipAutophrasesLetter });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const relationshipAutophrasesLetter = await RelationshipAutophrasesLettersService.
                update(req.params, req.body);
            res.send({relationshipAutophrasesLetter});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RelationshipAutophrasesLettersService.delete(req.params, req.user.id);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const relationshipAutophrasesLetter = await RelationshipAutophrasesLettersService.findById(req.params);
            res.send({ relationshipAutophrasesLetter });
        } catch(error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await RelationshipAutophrasesLettersService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = RelationshipAutophrasesLetterController;
