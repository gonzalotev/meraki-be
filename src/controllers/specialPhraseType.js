const { SpecialPhraseTypeService } = include('services');

class SpecialPhraseTypeController {
    static async fetch(req, res, next) {
        try {
            const specialsPhrasesTypes = await SpecialPhraseTypeService.fetch();
            res.send({ specialsPhrasesTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const specialPhraseType = await SpecialPhraseTypeService.findOne(req.params);
            res.send({ specialPhraseType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const specialPhraseType = await SpecialPhraseTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ specialPhraseType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const specialPhraseType = await SpecialPhraseTypeService.update(req.params, req.body);
            res.send({specialPhraseType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await SpecialPhraseTypeService.delete(req.params, req.user.id);
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
            const stream = await SpecialPhraseTypeService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = SpecialPhraseTypeController;
