const users = require('./users');
const staticData = require('./static-data');
const diccionarioLinguistico = require('./diccionarioLinguistico');
const operativos = require('./operativos');
const rolOperativoVariable = require('./rolOperativoVariable');
const roles = require('./roles');
const assigments = require('./assigments');
module.exports = {
    ...diccionarioLinguistico,
    ...operativos,
    ...rolOperativoVariable,
    ...users,
    ...staticData,
    ...roles,
    ...assigments
};
