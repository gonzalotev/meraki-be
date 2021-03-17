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
const services = reduce(fs.readdirSync(__dirname), (servicesObj, filename) => {
    if (!includes(filename, 'index.js')) {
        // eslint-disable-next-line lodash/prefer-lodash-method
        servicesObj[`${upperFirst(camelCase(filename.replace('.js', '')))}Service`] = include(`services/${filename}`);
    }
    return servicesObj;
}, {});

module.exports = services;
