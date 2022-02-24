const moment = require('moment');
const isString = require('lodash/isString');
const isDate = require('lodash/isDate');

module.exports = (date, format = 'DD-MM-YYYY') => {
    if(date && isDate(date)){
        return date;
    }
    if(date && isString(date)){
        return moment(date, format).toDate();
    }
    return null;
};
