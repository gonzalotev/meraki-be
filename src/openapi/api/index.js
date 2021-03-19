const users = require('./users');
const staticData = require('./static-data');
const diccionarioLinguistico = require('./diccionarioLinguistico');
const operativos = require('./operativos');
const rolOperativoVariable = require('./rolOperativoVariable');
const userRole = require('./user-role');
const roles = require('./roles');
module.exports = {
    ...diccionarioLinguistico,
    ...operativos,
    ...rolOperativoVariable,
    ...users,
    ...staticData,
    ...userRole,
    ...roles
};
