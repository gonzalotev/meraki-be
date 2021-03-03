const assignments = require('./assignments');
const users = require('./users');
const staticData = require('./staticData');
const fieldMaterials = require('./fieldMaterials');
const types = require('./types');
const reviews = require('./reviews');
const logs = require('./logs');
const monitoring = require('./monitoring');
const diccionarioLinguistico = require('./diccionarioLinguistico');
const operativos = require('./operativos');
const variableEstadistica = require('./variableEstadistica');
const rolOperativoVariable = require('./rolOperativoVariable');
module.exports = {
    ...diccionarioLinguistico,
    ...operativos,
    ...variableEstadistica,
    ...rolOperativoVariable,
    ...assignments,
    ...users,
    ...staticData,
    ...fieldMaterials,
    ...types,
    ...reviews,
    ...logs,
    ...monitoring
};
