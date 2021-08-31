const users = require('./user');
const assignments = require('./assignments');
const staticData = require('./staticData');
const dictionaryLinguistic = require('./dictionaryLinguistic');
const operatives = require('./operatives');
const staticalVariables = require('./staticalVariables');
const rolesTypes = require('./rolesTypes');
const ticketTypes = require('./ticketTypes');
const questionTypes = require('./questionTypes');
const organizationTypes = require('./organizationTypes');
const specialPhrasesTypes = require('./specialPhrasesTypes');
const operativesLot = require('./operativesLot');
const relationshipTypes = require('./relationshipTypes');
const relationshipAutophrasesQuestionCloseds = require('./relationshipAutophrasesQuestionCloseds');
const dictionaryTypes = require('./dictionaryTypes');
const documentTypes = require('./documentTypes');
const nomenclatorSubtypes = require('./nomenclatorSubtypes');
const editors = require('./editors');
const assignmentRoles = require('./assignmentRoles');
const nomenclatorTypes = require('./nomenclatorTypes');
const networkTypes = require('./networkTypes');
const autoPhrases = require('./autoPhrases');
const relationshipAutophrasesNomenclatures = require('./relationshipAutophrasesNomenclatures');
const relationshipAutophrasesLetters = require('./relationshipAutophrasesLetters');
const newWords = require('./newWords');
const newPhrases = require('./newPhrases');
const wordsDictionary = require('./wordsDictionary');
const wordCorrector = require('./wordCorrectors');
const operativeSources = require('./operativeSources');
const assignmentRolesNomenclators = require('./assignmentRolesNomenclators');
const assignmentRolesOperativeVariables = require('./assignmentRolesOperativeVariables');
const sourceQuestionRelation = require('./sourceQuestionsRelations');
const questions = require('./questions');
const ticket = require ('./ticket');
const microprocessesListsIfWords = require('./microprocessesListsIfWords');
const encodingProcesses = require('./encodingProcesses');
const stepsEncodingProcesses = require('./stepsEncodingProcesses');
const operativeStructure = require('./operativeStructure');
const lots = require('./lots');
const microprocessDefinition = require('./microprocessDefinition');
const stepsLinguisticProcesses = require('./stepsLinguisticProcesses');
const microprocessesListIf = require('./microprocessesListIf');
const microprocessesClosedQuestionIf = require('./microprocessesClosedQuestionIf');
const documents = require('./documents');
const microprocessesStepsOptions = require('./microprocessesStepsOption');

module.exports = {
    ...assignments,
    ...dictionaryLinguistic,
    ...operatives,
    ...staticalVariables,
    ...users,
    ...staticData,
    ...rolesTypes,
    ...ticketTypes,
    ...specialPhrasesTypes,
    ...relationshipTypes,
    ...dictionaryTypes,
    ...documentTypes,
    ...nomenclatorSubtypes,
    ...editors,
    ...organizationTypes,
    ...questionTypes,
    ...nomenclatorTypes,
    ...networkTypes,
    ...autoPhrases,
    ...newWords,
    ...wordsDictionary,
    ...wordCorrector,
    ...newPhrases,
    ...operativeSources,
    ...microprocessesListsIfWords,
    ...relationshipAutophrasesNomenclatures,
    ...relationshipAutophrasesLetters,
    ...assignmentRoles,
    ...assignmentRolesNomenclators,
    ...assignmentRolesOperativeVariables,
    ...relationshipAutophrasesQuestionCloseds,
    ...sourceQuestionRelation,
    ...questions,
    ...operativesLot,
    ...ticket,
    ...encodingProcesses,
    ...stepsEncodingProcesses,
    ...operativeStructure,
    ...lots,
    ...microprocessDefinition,
    ...stepsLinguisticProcesses,
    ...microprocessesListIf,
    ...microprocessesClosedQuestionIf,
    ...documents,
    ...microprocessesStepsOptions
};
