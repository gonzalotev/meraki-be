const {WordsDictionaryService} = include('services');
const trim = require('lodash/trim');
const split = require('lodash/split');
const replace = require('lodash/replace');
const toUpper = require('lodash/toUpper');
const difference = require('lodash/difference');
const isEmpty = require('lodash/isEmpty');
const {standarText} = include('util');

module.exports = async (req, res, next) => {
    try {
        const {corrector, dictionary} = req.body;
        if(corrector){
            corrector.right = trim(corrector.right);
            corrector.right = toUpper(corrector.right);
            const right = replace(corrector.right, /\s+/g, ' ');
            const rightWords = split(right, ' ');
            const {wordsFound} = await WordsDictionaryService.checkIfAllWordsExist(rightWords);
            const wordsNotFound = difference(rightWords, wordsFound);
            if(!isEmpty(wordsNotFound)){
                res.status(409);
                return res.send({wordsNotFound});
            }
            req.body.corrector.right = right;
        }
        if(dictionary){
            const family = dictionary.family ? standarText(dictionary.family) : null;
            if(family) {
                const familyWords = split(family, ' ');
                const {wordsFound} = await WordsDictionaryService.checkIfAllWordsExist(familyWords);
                const familyWordsNotFound = difference(familyWords, wordsFound);
                if(!isEmpty(familyWordsNotFound)){
                    res.status(409);
                    return res.send({familyWordsNotFound});
                }
            }
            req.body.dictionary.family = family;
            req.body.dictionary.truncate = standarText(dictionary.truncate);
            req.body.dictionary.acronim = standarText(dictionary.acronim);
        }
        return next();
    } catch(err) {
        next(err);
    }
};
