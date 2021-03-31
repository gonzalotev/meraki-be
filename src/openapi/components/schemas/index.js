const Assigment = require('./assigment');
const DictionaryLinguistic = require('./dictionaryLinguistic');
const Error = require('./error');
const Files = require('./files');
const Lots = require('./lots');
const Nomenclators = require('./nomenclators');
const Operatives = require('./operatives');
const Profile = require('./profile');
const Roles = require('./roles');
const StatisticalVariable = require('./statisticalVariable');
const Success = require('./success');
const User = require('./user');
const UserRole = require('./userRole');
const ValidateToken = require('./validateToken');

module.exports = {
    ArrayString: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'string'}
    },
    ArrayNumber: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'integer'}
    },
    ids: {
        type: 'array',
        uniqueItems: true,
        items: {
            type: 'string',
            format: 'uuid'
        }
    },
    ProfileUser: {
        allOf: [{$ref: '#/components/schemas/User'}],
        type: 'object',
        required: [
            'roles'
        ],
        properties: {
            role: {
                type: 'array',
                items: {type: 'string'}
            },
            attributes: {type: 'object'}
        }
    },
    Assigment,
    DictionaryLinguistic,
    Error,
    Files,
    Lots,
    Nomenclators,
    Operatives,
    Profile,
    Roles,
    StatisticalVariable,
    Success,
    User,
    UserRole,
    ValidateToken
};
