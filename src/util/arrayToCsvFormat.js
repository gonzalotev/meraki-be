const map = require('lodash/map');
const join = require('lodash/join');

module.exports = dataArray => {
    const nuevoArray = map(dataArray, value => `"${value ? value : ''}"`);
    const csv = join(nuevoArray, '; ');
    return `${csv}\n`;
};
