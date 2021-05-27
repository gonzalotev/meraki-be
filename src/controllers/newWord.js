const { NewWordService, WordsDictionaryService, WordCorrectorService } = include('services');

class NewWordController {
    static async fetch(req, res, next) {
        try {
            const newsWords = await NewWordService.fetch();
            const uniqueOperativeVariable = await NewWordService.fetchOperativeVariables();
            res.send({ newsWords, uniqueOperativeVariable });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const newWord = await NewWordService.findOne(req.params);
            res.send({ newWord });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const {newWord, dictionary, corrector} = req.body;
            const response = {};
            if(dictionary.save){
                const createdDictionary = await WordsDictionaryService.createFromNewWords(
                    newWord,
                    dictionary,
                    req.user.id
                );
                response.dictionary = createdDictionary;
                res.status(201);
            } else if(corrector.save){
                const createdCorrector = await WordCorrectorService.create({
                    ...corrector,
                    wrong: newWord.word,
                    frequency: newWord.frequency
                }, req.user.id);
                const updatedNewWord = await NewWordService.updateOne({...newWord, corrected: true});
                response.corrector = createdCorrector;
                response.newWord = updatedNewWord;
                res.status(201);
            } else {
                const updatedNewWord = await NewWordService.updateOne({...newWord, corrected: false});
                response.newWord = updatedNewWord;
                res.status(200);
            }
            console.log(response);
            res.send(response);
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const newWord = await NewWordService.update(req.params, req.body);
            res.send({newWord});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await NewWordService.delete(req.params, req.user.id);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static async fetchStaticData(req, res, next){
        try{
            const operatives = await NewWordService.fetchOperativeVariables();
            res.send({operatives});
        } catch(error){
            next(error);
        }
    }
    static async findFirst(req, res, next){
        try{
            const newWord = await NewWordService.findFirst(req.params);
            res.send({newWord});
        }catch(error){
            next(error);
        }
    }
}

module.exports = NewWordController;
