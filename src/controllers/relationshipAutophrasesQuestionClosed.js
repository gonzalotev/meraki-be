const { RelationshipAutophrasesQuestionClosedService } = include('services');

class RelationshipAutophrasesQuestionClosedController {
    static async fetch(req, res, next) {
        try {
            const relationshipsTypes = await RelationshipAutophrasesQuestionClosedService.fetch();
            res.send({ relationshipsTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipAutophrasesQuestionClosed = await RelationshipAutophrasesQuestionClosedService.
                findOne(req.params);
            res.send({ relationshipAutophrasesQuestionClosed });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relationshipAutophrasesQuestionClosed = await RelationshipAutophrasesQuestionClosedService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipAutophrasesQuestionClosed });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const relationshipAutophrasesQuestionClosed = await RelationshipAutophrasesQuestionClosedService.
                update(req.params, req.body);
            res.send({relationshipAutophrasesQuestionClosed});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RelationshipAutophrasesQuestionClosedService.delete(req.params, req.user.id);
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

module.exports = RelationshipAutophrasesQuestionClosedController;