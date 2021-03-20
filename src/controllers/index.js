const fs = require('fs');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const includes = require('lodash/includes');
const reduce = require('lodash/reduce');
const controllers = reduce(fs.readdirSync(__dirname), (controllersObj, filename) => {
    if (!includes(filename, 'index.js')) {
        // eslint-disable-next-line lodash/prefer-lodash-method
        controllersObj[`${upperFirst(camelCase(filename.replace('.js', '')))}Controller`] = include(`controllers/${filename}`);
    }
    return controllersObj;
}, {});

module.exports = controllers;
