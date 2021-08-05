const assign = require('lodash/assign');
const get = require('lodash/get');
const join = require('lodash/join');
const map = require('lodash/map');
const pick = require('lodash/pick');
const reduce = require('lodash/reduce');
const toLower = require('lodash/toLower');
const values = require('lodash/values');
const moment = require('moment');
const isDate = require('lodash/isDate');
const includes = require('lodash/includes');
const keys = require('lodash/keys');
const clone = require('lodash/clone');
const isString = require('lodash/isString');
const { getOffset, getPageSize } = require('./getOffset');
const standarText = require('./standarText');
const arrayToCsvFormat = require('./arrayToCsvFormat');

const reducedList = (array, filterKey, keyData) => reduce(array, (objectsByKeyValue, obj) => {
    const value = join(values(pick(obj, filterKey)), '');
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat({
        name: get(obj, keyData),
        _id: get(obj, keyData)
    });
    return objectsByKeyValue;
}, {});

const buildArchQuery = query => {
    const archFilter = {};
    // eslint-disable-next-line lodash/collection-return, lodash/collection-method-value
    map(query, (value, key) => {
        assign(archFilter, {[key]: toLower(value)});
    });

    return archFilter;
};

const dateToString = date => {
    if(isDate(date)){
        return moment(date).format('YYYY-MM-DD');
    }else if(moment(date, 'DD-MM-YYYY', true).isValid()){
        return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    }
    return null;
};
const dateTimeToString = dateTime => {
    if(isDate(dateTime)){
        return moment(dateTime).format('DD-MM-YYYY HH:mm:ss');
    }
    return null;
};
const dateTimeToStrings = dateTime => {
    if(isDate(dateTime)){
        return moment(dateTime).format('DD-MM-YYYY');
    }
    return null;
};

const stringToDate = date => {
    if(date && isDate(date)){
        return date;
    }
    if(date && isString(date)){
        return moment(date).toDate();
    }
    return null;
};

exports.dateToString = dateToString;

const setDate = obj => {
    assign(obj, { createdAt: dateToString(obj.createdAt), deletedAt: dateToString(obj.deletedAt)});
    return obj;
};

const rename = (obj, key, newKey) => {
    if(includes(keys(obj), key)) {
        obj[newKey] = clone(obj[key]);
        delete obj[key];
    }
    return obj;
};
const convertKeysNames = (props, columns) => {
    const convertedObject = {};
    // eslint-disable-next-line lodash/collection-return, lodash/collection-method-value
    map(props, (value, index) => {
        if (includes(keys(columns), index)) {
            assign(convertedObject, {[columns[index]]: value});
        }
    });
    return convertedObject;
};
module.exports = {
    buildArchQuery,
    reducedList,
    dateToString,
    dateTimeToString,
    getOffset,
    getPageSize,
    setDate,
    rename,
    stringToDate,
    convertKeysNames,
    standarText,
    arrayToCsvFormat,
    dateTimeToStrings
};
