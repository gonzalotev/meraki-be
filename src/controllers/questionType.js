const { QuestionTypeService } = include('services');

class QuestionTypeController {
    static async fetch(req, res, next) {
        try {
            const questionsTypes = await QuestionTypeService.fetch();
            res.send({ questionsTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const questionType = await QuestionTypeService.findOne(req.params);
            res.send({ questionType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const questionType = await QuestionTypeService.create(req.body, req.user.id);
            res.send({ success: true, questionType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const questionType = await QuestionTypeService.update(req.params, req.body);
            res.send({success: true, questionType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await QuestionTypeService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await QuestionTypeService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = QuestionTypeController;
