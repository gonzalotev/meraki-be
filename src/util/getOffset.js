const { PAGE_SIZE } = process.env;
const toNumber = require('lodash/toNumber');

exports.getOffset = (page, pageSize = toNumber(PAGE_SIZE)) => {
    return (page-1) * pageSize;
};

exports.getPageSize = () => toNumber(PAGE_SIZE);
