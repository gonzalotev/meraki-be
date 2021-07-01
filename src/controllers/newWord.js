const { NewWordService, NewPhraseService, WordsDictionaryService, WordCorrectorService } = include('services');
const knex = include('helpers/database');
const isEmpty = require('lodash/isEmpty');

class NewWordController {
    static async fetch(req, res, next) {
        try {
            const newsWords = await NewWordService.fetch();
            const uniqueOperativeVariable =
        await NewWordService.fetchOperativeVariables();
            res.send({ newsWords, uniqueOperativeVariable });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const newWord = await NewWordService.findOne(req.params);
            res.send({ newWord });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const {newWord, dictionary, corrector} = req.body;
            const response = {};
            const {frequency, abc, word} = newWord;
            const transaction = await knex.transaction();
            if(dictionary){
                const createdDictionary = await WordsDictionaryService.create(
                    {...dictionary, frequency, abc, word},
                    req.user.id,
                    transaction
                );
                const updatedNewWord = await NewWordService.updateOne({...newWord, corrected: true}, transaction);
                response.dictionary = createdDictionary;
                response.newWord = updatedNewWord;
                res.status(201);
            } else if(corrector){
                const createdCorrector = await WordCorrectorService.create(
                    {...corrector, frequency, wrong: word},
                    req.user.id,
                    transaction
                );
                const updatedNewWord = await NewWordService.updateOne({...newWord, corrected: true}, transaction);
                response.corrector = createdCorrector;
                response.newWord = updatedNewWord;
                res.status(201);
            } else {
                const updatedNewWord = await NewWordService.updateOne({...newWord, corrected: false}, transaction);
                response.newWord = updatedNewWord;
                res.status(200);
            }
            await transaction.commit();
            res.send(response);
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const newWord = await NewWordService.update(req.params, req.body);
            res.send({ newWord });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await NewWordService.delete(req.params, req.user.id);
            if (success) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            next(err);
        }
    }

    static async fetchStaticData(req, res, next) {
        try {
            const operatives = await NewWordService.fetchOperativeVariables();
            res.send({ operatives });
        } catch (error) {
            next(error);
        }
    }
    static async findFirst(req, res, next) {
        try {
            let phrases = [];
            const newWord = await NewWordService.findFirst(req.params);
            if(!isEmpty(newWord)){
                phrases = await NewPhraseService.fetch({ word: newWord.word });
            }
            res.send({ newWord, phrases });
        } catch (error) {
            next(error);
        }
    }
    static async downloadCsv(req, res, next){
        try {
            const stream = await NewWordService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = NewWordController;
