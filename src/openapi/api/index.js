const users = require('./user');
const assignments = require('./assignments');
const staticData = require('./staticData');
const dictionaryLinguistic = require('./dictionaryLinguistic');
const operatives = require('./operatives');
const statisticalVariable = require('./statisticalVariable');
const roles = require('./roles');
const chatTypes = require('./chatTypes');
const questionTypes = require('./questionTypes');
const classifierTypes = require('./classifierTypes');
const specialPhrasesTypes = require('./specialPhrasesTypes');
const relationshipTypes = require('./relationshipTypes');
const dictionaryTypes = require('./dictionaryType');
const documentTypes = require('./documentTypes');
const nomenclatorSubtypes = require('./nomenclatorSubtypes');
const editors = require('./editors');
const nomenclatorTypes = require('./nomenclatorTypes');
const networkTypes = require('./networkTypes');
module.exports = {
    ...assignments,
    ...dictionaryLinguistic,
    ...operatives,
    ...statisticalVariable,
    ...users,
    ...staticData,
    ...roles,
    ...chatTypes,
    ...specialPhrasesTypes,
    ...relationshipTypes,
    ...dictionaryTypes,
    ...documentTypes,
    ...nomenclatorSubtypes,
    ...editors,
    ...classifierTypes,
    ...questionTypes,
    ...nomenclatorTypes,
    ...networkTypes
};
