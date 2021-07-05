const { RelationshipAutophrasesQuestionClosedsService } = include('services');

class RelationshipAutophrasesQuestionClosedsController {
    static async fetch(req, res, next) {
        try {
            const relationshipAutophrasesQuestionCloseds = await RelationshipAutophrasesQuestionClosedsService
                .fetch(req.query);
            const total = await RelationshipAutophrasesQuestionClosedsService.getTotal({source: req.query.source});
            res.send({ relationshipAutophrasesQuestionCloseds, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try{
            const relationshipAutophraseQuestionClosed = await RelationshipAutophrasesQuestionClosedsService
                .findOne(req.params);
            res.send({relationshipAutophraseQuestionClosed});
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relationshipAutophraseQuestionClosed = await RelationshipAutophrasesQuestionClosedsService
                .create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipAutophraseQuestionClosed });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const relationshipAutophraseQuestionClosed = await RelationshipAutophrasesQuestionClosedsService
                .update(req.params, req.body);
            res.send({relationshipAutophraseQuestionClosed});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RelationshipAutophrasesQuestionClosedsService.delete(req.params, req.user.id);
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
            const stream = await RelationshipAutophrasesQuestionClosedsService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = RelationshipAutophrasesQuestionClosedsController;
