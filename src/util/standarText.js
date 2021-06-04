const upperCase = require('lodash/upperCase');
const trim = require('lodash/trim');
const replace = require('lodash/replace');

module.exports = text => {
    const upperText = upperCase(trim(text));
    const textWithOneSpace = replace(upperText, /\s+/g, ' ');
    return textWithOneSpace;
};
