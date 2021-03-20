const users = require('./users');
const assigments = require('./assigments');
const staticData = require('./staticData');
const DictionaryLinguistic = require('./DictionaryLinguistic');
const operatives = require('./operatives');
const statisticalVariable = require('./statisticalVariable');
const rolOperativoVariable = require('./rolOperativoVariable');
const userRole = require('./user-role');

module.exports = {
    ...assigments,
    ...DictionaryLinguistic,
    ...operatives,
    ...statisticalVariable,
    ...rolOperativoVariable,
    ...users,
    ...staticData,
    ...userRole
};
