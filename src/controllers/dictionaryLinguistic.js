const { DictionaryLinguisticService } = include('services');
const {DictionaryLinguistic} = include('/models');
const {PAGE_SIZE} = process.env;

class DictionaryLinguisticController {
    static fetch(req, res, next) {
        try {
            const dictionaryLinguistic = DictionaryLinguisticService.findAll();
            res.send({ dictionaryLinguistic });
        } catch(error) {
            next(error);
        }
    }

    static async fetchOlder(req, res, next){
        try {
            const {page, ...filter} = req.query;
            await DictionaryLinguistic.startTransaction();
            const dictionaries = await DictionaryLinguistic.find(page, {...filter, FECHA_BAJA: null});
            const total = await DictionaryLinguistic.countRows();
            await DictionaryLinguistic.commitTransaction();
            res.send({limit: PAGE_SIZE, total, dictionaries});
        } catch(err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next){
        try {
            const dictionary = await DictionaryLinguistic.findById(req.params);
            res.send({dictionary});
        } catch(err) {
            next(err);
        }
    }

    static create(req, res, next){
        try {
            const dictionary = DictionaryLinguisticService.create(req.body, 'req.user.id');
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
            const success = DictionaryLinguisticService.delete(req.body, 'req.user.id');
            res.send({success});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DictionaryLinguisticController;
