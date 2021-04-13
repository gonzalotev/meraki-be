const { SpecialPhraseTypeService } = include('services');

class SpecialPhraseTypeController {
    static async fetch(req, res, next) {
        try {
            const specialPhrasesTypes = await SpecialPhraseTypeService.fetch();
            res.send({ specialPhrasesTypes });
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
            res.send({ success: true, specialPhraseType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const specialPhraseType = await SpecialPhraseTypeService.update(req.params, req.body);
            res.send({success: true, specialPhraseType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await SpecialPhraseTypeService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = SpecialPhraseTypeController;
