const User = require('./User');
const Profile = require('./Profile');
const Error = require('./Error');
const ValidateToken = require('./ValidateToken');
const Success = require('./Success');
const Files = require('./Files');
const DiccionarioLinguistico = require('./DiccionarioLinguistico');
const Operativos = require('./Operativos');
const VariableEstadistica = require('./VariableEstadistica');
const RolOperativoVariable = require('./RolOperativoVariable');
const UserRole = require('./UserRole');

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
    Profile,
    User,
    Error,
    ValidateToken,
    Success,
    Files,
    DiccionarioLinguistico,
    Operativos,
    VariableEstadistica,
    RolOperativoVariable,
    UserRole
};
