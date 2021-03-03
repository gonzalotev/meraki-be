const ActivityDiary = require('./ActivityDiary');
const Address = require('./Address');
const Area = require('./Area');
const Assignment = require('./Assignment');
const CreateUser = require('./CreateUser');
const Error = require('./Error');
const ValidateToken = require('./ValidateToken');
const Success = require('./Success');
const FieldMaterial = require('./FieldMaterial');
const SubCoordinator = require('./SubCoordinator');
const AssignmentByUps = require('./AssignmentByUps');
const Files = require('./Files');
const Statuses = require('./Statuses');
const Review = require('./Review');
const AssignmentType = require('./AssignmentType');
const Log = require('./Log');
const Situations = require('./Situations');
const Survey = require('./Survey');
const Dwelling = require('./Dwelling');
const Visit = require('./Visit');
const Household = require('./Household');
const Member = require('./Member');
const Monitoring = require('./Monitoring');
const DiccionarioLinguistico = require('./DiccionarioLinguistico');
const Operativos = require('./Operativos');
const VariableEstadistica = require('./VariableEstadistica');
const RolOperativoVariable = require('./RolOperativoVariable');
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
    Role: {
        type: 'object',
        properties: {
            id: {type: 'string'},
            name: {type: 'string'},
            order: {type: 'integer'}
        }
    },
    ids: {
        type: 'array',
        uniqueItems: true,
        items: {
            type: 'string',
            format: 'uuid'
        }
    },
    User: {
        type: 'object',
        properties: {
            id: {
                description: 'id of user',
                type: 'string',
                format: 'uuid'
            },
            username: {
                description: 'Username.',
                type: 'string'
            },
            name: {
                description: 'Name.',
                type: 'string'
            },
            surname: {
                description: 'Surname.',
                type: 'string'
            },
            documentId: {
                description: 'Document or CUIT.',
                type: 'string'
            },
            email: {
                description: 'Email.',
                type: 'string',
                format: 'email'
            },
            deleted: {
                type: 'boolean',
                description: 'If the user its deleted from the current APP'
            }
        },
        required: [
            'id',
            'name',
            'surname',
            'documentId',
            'email',
            'deleted'
        ]
    },
    Profile: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                nullable: true
            },
            success: {
                type: 'boolean',
                nullable: true
            },
            user: {
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
            }
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
    ActivityDiary,
    Address,
    Area,
    Assignment,
    CreateUser,
    Error,
    ValidateToken,
    Success,
    FieldMaterial,
    SubCoordinator,
    AssignmentByUps,
    Files,
    Statuses,
    Review,
    AssignmentType,
    Log,
    Situations,
    Survey,
    Dwelling,
    Visit,
    Household,
    Member,
    Monitoring,
    DiccionarioLinguistico,
    Operativos,
    VariableEstadistica,
    RolOperativoVariable
};
