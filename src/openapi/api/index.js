const users = require('./user');
const assignments = require('./assignments');
const staticData = require('./staticData');
const dictionaryLinguistic = require('./dictionaryLinguistic');
const operatives = require('./operatives');
const statisticalVariable = require('./statisticalVariable');
const variableOperationalRole = require('./variableOperatingRole');
const roles = require('./roles');

module.exports = {
    ...assignments,
    ...dictionaryLinguistic,
    ...operatives,
    ...statisticalVariable,
    ...variableOperationalRole,
    ...users,
    ...staticData,
    ...roles
};
