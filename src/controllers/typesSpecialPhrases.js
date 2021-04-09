const { typesSpecialPhrases } = include('models');
const { TypesSpecialPhrasesService } = include('services');

class TypesSpecialPhrasesController {
    static async fetch(req, res, next) {
        try {
            const typesSpecialPhrases = await TypesSpecialPhrasesService.fetch();
            res.send({ typesSpecialPhrases });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try{
            const typeSpecialPhrase = await typesSpecialPhrases.findById(req.params);
            res.send({ typeSpecialPhrase });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const userCreator = req.user.id;
            const typeSpecialPhrase = await TypesSpecialPhrasesService.create(req.body, userCreator);
            res.send({ success: true, typeSpecialPhrase });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const typeSpecialPhrase = await typesSpecialPhrases.updateOne(req.params, req.body);
            res.send({ typeSpecialPhrase });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const userDestroyer = req.user.id;
            const result = await typesSpecialPhrases.deleteOne(req.params, userDestroyer);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }
}

module.exports = TypesSpecialPhrasesController;
