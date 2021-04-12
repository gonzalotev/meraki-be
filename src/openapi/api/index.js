const users = require('./user');
const assignments = require('./assignments');
const staticData = require('./staticData');
const dictionaryLinguistic = require('./dictionaryLinguistic');
const operatives = require('./operatives');
const statisticalVariable = require('./statisticalVariable');
const roles = require('./roles');
const chatTypes = require('./chatTypes');
const netTypes = require('./netTypes');
const relationshipTypes = require('./relationshipTypes');
const dictionaryTypes = require('./dictionaryType');
const documentTypes = require('./documentTypes');
const nomenclatorSubtypes = require('./nomenclatorSubtypes');
const editors = require('./editors');
module.exports = {
    ...assignments,
    ...dictionaryLinguistic,
    ...operatives,
    ...statisticalVariable,
    ...users,
    ...staticData,
    ...roles,
    ...chatTypes,
    ...netTypes,
    ...relationshipTypes,
    ...dictionaryTypes,
    ...documentTypes,
    ...nomenclatorSubtypes,
    ...editors
};
