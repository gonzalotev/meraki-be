const {
    RolesService,
    DictionaryTypeService,
    StaticalVariableService,
    StaticDataService
} = include('services');
const isBoolean = require('lodash/isBoolean');
const { decodeQuery } = include('util');

class StaticDataController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const query = decodeQuery(req.query);
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
                microprocessQuestionsClosed,
                variablesByOperative,
                microprocessesBySteps,
                pointersStepTo,
                pointersStepIn
            } = query;
            if (microprocessQuestionsClosed) {
                await StaticDataService.getMicroprocessQuestionsClosedData(data);
            }
            if (levels) {
                await StaticDataService.getLevels(data, levels);
            }
            if (relationshipAutophrasesLetter) {
                await StaticDataService.getRelationshipAutophrasesLetter(data, relationshipAutophrasesLetter);
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
                await StaticDataService.getLots(data, lots);
            }
            if (fonts) {
                await StaticDataService.getFont(data);
            }

            if (nomenclatures && isBoolean(nomenclatures)) {
                await StaticDataService.getNomenclatures(data);
            } else if (nomenclatures) {
                await StaticDataService.getNomenclatures(data, nomenclatures);
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
            } else if (microprocessesLists) {
                await StaticDataService.getMicroprocessesLists(data, microprocessesLists);
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
            if (variablesByOperative) {
                await StaticDataService.getVariablesByOperative(data, variablesByOperative);
            }
            if (microprocessesBySteps) {
                await StaticDataService.getMicroprocessesBySteps(data);
            }
            if (pointersStepTo) {
                await StaticDataService.getPointersStepTo(data, pointersStepTo);
            }
            if (pointersStepIn) {
                await StaticDataService.getPointersStepIn(data, pointersStepIn);
            }
            res.send(data);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = StaticDataController;
