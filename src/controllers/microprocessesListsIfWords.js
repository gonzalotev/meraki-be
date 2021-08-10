const { MicroprocessesListsIfWordsService } = include('services');

class MicroprocessesListsIfWordsController {
    static async fetch(req, res, next) {
        try {
            const microprocessesListsIfWords = await MicroprocessesListsIfWordsService.fetch(req.query);
            res.send({ microprocessesListsIfWords });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesListsIfWord = await MicroprocessesListsIfWordsService.findOne(req.params);
            res.send({ microprocessesListsIfWord });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const microprocessesListsIfWord = await MicroprocessesListsIfWordsService.create(req.body, req.user.id);
            res.send({ success: true, microprocessesListsIfWord });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const microprocessesListsIfWord = await MicroprocessesListsIfWordsService.update(req.params, req.body);
            res.send({success: true, microprocessesListsIfWord});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await MicroprocessesListsIfWordsService.delete(req.params, req.user.id);
            res.send({success});
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

module.exports = MicroprocessesListsIfWordsController;
