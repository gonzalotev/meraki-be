const { SourceQuestionsRelationsService } = include('services');

class SourceQuestionsRelationsController {
    static async fetch(req, res, next) {
        try {
            const sourceQuestionsRelations = await SourceQuestionsRelationsService.fetch(req.query);
            const total = await SourceQuestionsRelationsService.getTotal({source: req.query.source});
            res.send({ sourceQuestionsRelations, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try{
            const sourceQuestionRelation = await SourceQuestionsRelationsService.findOne(req.params);
            res.send({sourceQuestionRelation});
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const sourceQuestionRelation = await SourceQuestionsRelationsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ sourceQuestionRelation });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const sourceQuestionRelation = await SourceQuestionsRelationsService.update(req.params, req.body);
            res.send({sourceQuestionRelation});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await SourceQuestionsRelationsService.delete(req.params, req.user.id);
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
            const stream = await SourceQuestionsRelationsService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = SourceQuestionsRelationsController;
