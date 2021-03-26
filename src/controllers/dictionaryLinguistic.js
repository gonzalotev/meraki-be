const { DictionaryLinguisticService } = include('services');

class DictionaryLinguisticController {
    static async fetch(req, res, next) {
        try {
            const dictionaryLinguistic = await DictionaryLinguisticService.find(req.query.page);
            res.send({ dictionaryLinguistic });
        } catch(error) {
            next(error);
        }
    }

    static create(req, res, next){
        try {
            const dictionary = DictionaryLinguisticService.create(req.body, req.user.id);
            res.send({ success: true, dictionary });
        } catch(err) {
            next(err);
        }
    }

    static update(req, res, next){
        try{
            const dictionary = DictionaryLinguisticService.update(req.body);
            res.send({success: true, dictionary});
        } catch(err){
            next(err);
        }
    }

    static delete(req, res, next){
        try {
            const success = DictionaryLinguisticService.delete(req.body, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DictionaryLinguisticController;
