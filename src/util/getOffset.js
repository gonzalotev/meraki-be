const { PAGE_SIZE } = process.env;
const toNumber = require('lodash/toNumber');

exports.getOffset = page => {
<<<<<<< HEAD
    const offset = ((page-1) * toNumber(PAGE_SIZE));
=======
    const offset = (page-1) * toNumber(PAGE_SIZE);
>>>>>>> feat: create dictionary linguistic endpoint
    return offset;
};

exports.getPageSize = () => toNumber(PAGE_SIZE);
