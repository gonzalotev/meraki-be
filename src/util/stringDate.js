const moment = require('moment');
const isString = require('lodash/isString');
const isDate = require('lodash/isDate');

module.exports = (stringDate, format = 'DD-MM-YYYY') => {
    if(stringDate && isDate(stringDate)){
        return stringDate;
    }
    if(stringDate && isString(stringDate)){
        return moment(stringDate, format).toDate();
    }
    return null;
};
