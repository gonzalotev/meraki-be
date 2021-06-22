const { QuestionsService } = include('services');

class QuestionsController {
    static async fetch(req, res, next) {
        try {
            const questions = await QuestionsService.fetch();
            res.send({ questions });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const question = await QuestionsService.findOne(req.params);
            res.send({ question });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const question = await QuestionsService.create(req.body, req.user.id);
            res.send({ success: true, question });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const question = await QuestionsService.update(req.params, req.body);
            res.send({success: true, question});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await QuestionsService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = QuestionsController;
