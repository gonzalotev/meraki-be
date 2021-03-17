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
const { getOffset, getPageSize } = require('./getOffset');

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
    }
    return null;
};
const dateTimeToString = dateTime => {
    if(isDate(dateTime)){
        return moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
    }
    return null;
};

const setDate = obj => {
    assign(obj, { createdAt: dateToString(obj.createdAt), deletedAt: dateToString(obj.deletedAt)});
    return obj;
};

module.exports = {
    buildArchQuery,
    reducedList,
    dateToString,
    dateTimeToString,
    getOffset,
    getPageSize,
    setDate
};
