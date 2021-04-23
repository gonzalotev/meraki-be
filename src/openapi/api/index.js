const users = require('./user');
const assignments = require('./assignments');
const staticData = require('./staticData');
const dictionaryLinguistic = require('./dictionaryLinguistic');
const operatives = require('./operatives');
const staticalVariables = require('./staticalVariables');
const rolesTypes = require('./rolesTypes');
const chatTypes = require('./chatTypes');
const questionTypes = require('./questionTypes');
const classifierTypes = require('./classifierTypes');
const specialPhrasesTypes = require('./specialPhrasesTypes');
const relationshipTypes = require('./relationshipTypes');
const linguisticDictionaryTypes = require('./linguisticDictionaryTypes');
const documentTypes = require('./documentTypes');
const nomenclatorSubtypes = require('./nomenclatorSubtypes');
const editors = require('./editors');
const nomenclatorTypes = require('./nomenclatorTypes');
const networkTypes = require('./networkTypes');
module.exports = {
    ...assignments,
    ...dictionaryLinguistic,
    ...operatives,
    ...staticalVariables,
    ...users,
    ...staticData,
    ...rolesTypes,
    ...chatTypes,
    ...specialPhrasesTypes,
    ...relationshipTypes,
    ...linguisticDictionaryTypes,
    ...documentTypes,
    ...nomenclatorSubtypes,
    ...editors,
    ...classifierTypes,
    ...questionTypes,
    ...nomenclatorTypes,
    ...networkTypes
};
