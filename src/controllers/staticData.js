const {
    RolesService,
    DictionaryTypeService,
    StaticalVariableService,
    StaticDataService,
    OperativesService
} = include('services');

class StaticDataController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const {
                roles,
                dictionaryTypes,
                variables,
                genders,
                operatives,
                variablesNewsWords,
                newWoord,
                autoPhrase,
                newPhrases
            } = req.query;
            if (roles) {
                await RolesService.shortFetch(data);
            }
            if (dictionaryTypes) {
                await DictionaryTypeService.shortFetch(data);
            }
            if (variables) {
                await StaticalVariableService.shortFetch(data);
            }
            if (genders) {
                await StaticDataService.getGenders(data);
            }
            if (operatives) {
                await OperativesService.shortFetch(data);
            }
            if (variablesNewsWords) {
                await StaticDataService.getVariablesNewsWords(data);
            }
            if (newWoord) {
                await StaticDataService.getNewWord(data);
            }
            if (autoPhrase) {
                await StaticDataService.getAutoPhrase(data);
            }
            if (newPhrases) {
                await StaticDataService.getNewPhrase(data);
            }
            res.send(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = StaticDataController;
