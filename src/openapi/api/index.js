const users = require('./user');
const assignments = require('./assignments');
const staticData = require('./staticData');
const dictionaryLinguistic = require('./dictionaryLinguistic');
const staticalVariables = require('./staticalVariables');
const rolesTypes = require('./rolesTypes');
const ticketTypes = require('./ticketTypes');
const questionTypes = require('./questionTypes');
const organizationTypes = require('./organizationTypes');
const specialPhrasesTypes = require('./specialPhrasesTypes');
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
const newWords = require('./newWords');
const newPhrases = require('./newPhrases');
const wordsDictionary = require('./wordsDictionary');
const wordCorrector = require('./wordCorrectors');
const operativeSources = require('./operativeSources');
const assignmentRolesNomenclators = require('./assignmentRolesNomenclators');
const assignmentRolesOperativeVariables = require('./assignmentRolesOperativeVariables');
const sourceQuestionRelation = require('./sourceQuestionsRelations');

module.exports = {
    ...assignments,
    ...dictionaryLinguistic,
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
    ...relationshipAutophrasesNomenclatures,
    ...assignmentRoles,
    ...assignmentRolesNomenclators,
    ...assignmentRolesOperativeVariables,
    ...relationshipAutophrasesQuestionCloseds,
    ...sourceQuestionRelation
};
