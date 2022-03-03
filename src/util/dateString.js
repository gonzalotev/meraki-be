const moment = require('moment');
const isDate = require('lodash/isDate');

module.exports = (date, format) => {
    if(isDate(date)){
        return moment(date).format(format);
    }
    return null;
};
