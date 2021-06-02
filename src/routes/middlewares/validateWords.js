const {WordsDictionaryService} = include('services');
const trim = require('lodash/trim');
const split = require('lodash/split');
const replace = require('lodash/replace');
const upperCase = require('lodash/upperCase');
const difference = require('lodash/difference');
const isEmpty = require('lodash/isEmpty');

module.exports = async (req, res, next) => {
    try {
        const {corrector} = req.body;
        if(corrector.save){
            const right = replace(corrector.right, /\s+/g, ' ');
            const rightWords = split(upperCase(trim(right)), ' ');
            const {wordsFound} = await WordsDictionaryService.checkIfAllWordsExist(rightWords);
            const wordsNotFound = difference(rightWords, wordsFound);
            if(!isEmpty(wordsNotFound)){
                res.status(409);
                return res.send({wordsNotFound});
            }
        }
        return next();
    } catch(err) {
        next(err);
    }
};
