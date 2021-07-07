const map = require('lodash/map');
const join = require('lodash/join');
const isDate = require('lodash/isDate');
const utils = include('util');
module.exports = dataArray => {
    const nuevoArray = map(dataArray, value => {
        const emptyValue = '""';
        if (!value) {
            return emptyValue;
        }
        if (isDate(value)) {
            return `"${utils.dateToString(value)}"`;
        }
        return `"${value}"`;
    });
    const csv = join(nuevoArray, '; ');
    return `${csv}\n`;
};
