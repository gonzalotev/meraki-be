const User = require('./User');
const Profile = require('./Profile');
const Error = require('./Error');
const ValidateToken = require('./ValidateToken');
const Success = require('./Success');
const Files = require('./Files');
<<<<<<< HEAD
const DiccionarioLinguistico = require('./DiccionarioLinguistico');
const Operativos = require('./Operativos');
const RolOperativoVariable = require('./RolOperativoVariable');
const Role = require('./Role');
const VariableStadistics = require ('./VariableStadistics');
const Nomenclators = require('./Nomenclators');
const Assigment = require('./Assigment');
const Lots = require('./Lots');
=======
const DictionaryLinguistic = require('./DictionaryLinguistic');
const Operativos = require('./Operativos');
const VariableEstadistica = require('./VariableEstadistica');
const RolOperativoVariable = require('./RolOperativoVariable');
const UserRole = require('./UserRole');

>>>>>>> feat: create dictionary linguistic endpoint
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
<<<<<<< HEAD
    DiccionarioLinguistico,
    Operativos,
    RolOperativoVariable,
    Role,
    VariableStadistics,
    Nomenclators,
    Assigment,
    Lots
=======
    DictionaryLinguistic,
    Operativos,
    VariableEstadistica,
    RolOperativoVariable,
    UserRole
>>>>>>> feat: create dictionary linguistic endpoint
};
