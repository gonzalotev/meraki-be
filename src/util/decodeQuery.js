const map = require('lodash/map');
const isEmpty = require('lodash/isEmpty');
const isString = require('lodash/isString');
const isJsonString = require('./isJsonString');

module.exports = query => {
    if (isEmpty(query)) {
        return null;
    }
    const decodedQuery = {};
    //eslint-disable-next-line
    map(query, (value, key) => {
        if(isString(value)) {
            const decodeValue = decodeURIComponent(value);
            if(isJsonString(decodeValue)) {
                decodedQuery[key] = JSON.parse(decodeValue);
            } else {
                decodedQuery[key] = decodeValue;
            }
        } else {
            decodedQuery[key] = value;
        }
    });
    return decodedQuery;
};
