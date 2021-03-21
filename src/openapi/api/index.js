const users = require('./user');
const assignments = require('./assignments');
const staticData = require('./staticData');
const DictionaryLinguistic = require('./dictionaryLinguistic');
const operatives = require('./operatives');
const statisticalVariable = require('./statisticalVariable');
const variableOperationalRole = require('./variableOperatingRole');
const userRoles = require('./userRole');
const roles = require('./roles');

module.exports = {
    ...assignments,
    ...DictionaryLinguistic,
    ...operatives,
    ...statisticalVariable,
    ...variableOperationalRole,
    ...users,
    ...staticData,
    ...userRoles,
    ...roles
};
