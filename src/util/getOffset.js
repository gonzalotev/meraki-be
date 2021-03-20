const { PAGE_SIZE } = process.env;
const toNumber = require('lodash/toNumber');

exports.getOffset = page => {
    const offset = ((page-1) * toNumber(PAGE_SIZE));
    return offset;
};

exports.getPageSize = () => toNumber(PAGE_SIZE);
