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
}

module.exports = DictionaryLinguisticController;
