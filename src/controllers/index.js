const fs = require('fs');
const upperFirst = require('lodash/upperFirst');
<<<<<<< HEAD
const camelCase = require('lodash/camelCase');
const includes = require('lodash/includes');
const reduce = require('lodash/reduce');
=======
const includes = require('lodash/includes');
const reduce = require('lodash/reduce');
const camelCase = require('lodash/camelCase');
>>>>>>> feat: create dictionary linguistic endpoint
const controllers = reduce(fs.readdirSync(__dirname), (controllersObj, filename) => {
    if (!includes(filename, 'index.js')) {
        // eslint-disable-next-line lodash/prefer-lodash-method
        controllersObj[`${upperFirst(camelCase(filename.replace('.js', '')))}Controller`] = include(`controllers/${filename}`);
    }
    return controllersObj;
}, {});

module.exports = controllers;
