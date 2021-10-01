const split = require('lodash/split');

module.exports = fileName => {
    return split(fileName, /\.(?=\w+$)/);
};
