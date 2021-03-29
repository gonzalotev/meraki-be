const users = require('./user');
const assignments = require('./assignments');
const staticData = require('./staticData');
const dictionaryLinguistic = require('./dictionaryLinguistic');
const operatives = require('./operatives');
const statisticalVariable = require('./statisticalVariable');
const roles = require('./roles');
const chatTypes = require('./chatTypes');
const netTypes = require('./netTypes');

module.exports = {
    ...assignments,
    ...dictionaryLinguistic,
    ...operatives,
    ...statisticalVariable,
    ...users,
    ...staticData,
    ...roles,
    ...chatTypes,
    ...netTypes
};
