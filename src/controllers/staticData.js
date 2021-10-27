const {
    RolesService,
    DictionaryTypeService,
    StaticalVariableService,
    StaticDataService
} = include('services');
const isBoolean = require('lodash/isBoolean');
const isString = require('lodash/isString');

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
                newPhrases,
                nomenclators,
                lots,
                lot,
                fonts,
                nomenclatures,
                nomenclaturesGroup,
                nomenclatorsGroup,
                relationshipGroup,
                sources,
                documentsTypes,
                editors,
                questions,
                questionsTypes,
                operativeType,
                operators,
                frequency,
                support,
                ticketTypes,
                entryFieldsNames,
                microprocessesLists,
                microprocesses,
                originalAuxiliariesFields,
                finalAuxiliariesFields,
                datatypes,
                linguisticFieldProcesses,
                levels,
                relationshipAutophrasesLetter,
                microprocessQuestionsClosed
            } = req.query;
            if (microprocessQuestionsClosed) {
                await StaticDataService.getMicroprocessQuestionsClosedData(data);
            }
            if (levels) {
                const formattedLevels = JSON.parse(decodeURIComponent(levels));
                await StaticDataService.getLevels(data, formattedLevels);
            }
            if (relationshipAutophrasesLetter) {
                const formattedRelationshipAutophrasesLetter = JSON.parse(decodeURIComponent(
                    relationshipAutophrasesLetter));
                await StaticDataService.getRelationshipAutophrasesLetter(data, formattedRelationshipAutophrasesLetter);
            }
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
                await StaticDataService.getOperatives(data);
            }
            if (operators) {
                await StaticDataService.getOperators(data);
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
            if (nomenclators) {
                await StaticDataService.getNomenclators(data);
            }
            if (lots) {
                await StaticDataService.getLots(data);
            }

            if (fonts) {
                await StaticDataService.getFont(data);
            }

            if (nomenclatures && isBoolean(nomenclatures)) {
                await StaticDataService.getNomenclatures(data);
            } else if (nomenclatures && isString(nomenclatures)) {
                const formattedNomenclatures = JSON.parse(decodeURIComponent(nomenclatures));
                await StaticDataService.getNomenclatures(data, formattedNomenclatures);
            }
            if (nomenclaturesGroup) {
                await StaticDataService.getNomenclaturesGroup(data);
            }
            if (nomenclatorsGroup) {
                await StaticDataService.getNomenclatorsGroup(data);
            }
            if (relationshipGroup) {
                await StaticDataService.getRelationshipGroup(data);
            }
            if (sources) {
                await StaticDataService.getSources(data);
            }
            if (lot) {
                await StaticDataService.getLot(data);
            }
            if (editors) {
                await StaticDataService.getEditors(data);
            }
            if (documentsTypes) {
                await StaticDataService.getDocumentsTypes(data);
            }
            if (questions) {
                await StaticDataService.getQuestions(data);
            }
            if (questionsTypes) {
                await StaticDataService.getQuestionsTypes(data);
            }
            if (operativeType) {
                await StaticDataService.getOperativeType(data);
            }
            if (ticketTypes) {
                await StaticDataService.getTicketTypes(data);
            }
            if (frequency) {
                await StaticDataService.getFrequency(data);
            }
            if (microprocessesLists && isBoolean(microprocessesLists)) {
                await StaticDataService.getMicroprocessesLists(data);
            } else if (microprocessesLists && isString(microprocessesLists)) {
                const formattedLists = JSON.parse(decodeURIComponent(microprocessesLists));
                await StaticDataService.getMicroprocessesLists(data, formattedLists);
            }
            if (microprocesses) {
                await StaticDataService.getMicroprocesses(data);
            }
            if (support) {
                await StaticDataService.getSupport(data);
            }
            if (entryFieldsNames) {
                await StaticDataService.getEntryFieldsNames(data);
            }
            if (originalAuxiliariesFields) {
                await StaticDataService.getOriginalAuxiliariesFields(data);
            }
            if (finalAuxiliariesFields) {
                await StaticDataService.getFinalAuxiliariesFields(data);
            }
            if (datatypes) {
                await StaticDataService.getDatatypes(data);
            }
            if (microprocesses) {
                await StaticDataService.getMicroprocesses(data);
            }
            if (linguisticFieldProcesses) {
                await StaticDataService.getLinguisticFieldProcesses(data);
            }
            res.send(data);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = StaticDataController;
