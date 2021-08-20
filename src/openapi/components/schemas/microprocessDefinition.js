module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            nullable: false,
            maxLength: 10
        },
        variableId: {
            type: 'string',
            nullable: false,
            maxLength: 5
        },
        order: {type: 'number'},
        description: {
            type: 'string',
            nullable: false,
            maxLength: 120
        },
        observation: {
            type: 'string',
            nullable: true,
            maxLength: 120
        },
        domain: {
            type: 'string',
            nullable: true,
            maxLength: 300
        },
        dictionaryTypeId: {
            type: 'string',
            nullable: false,
            maxLength: 3
        },
        nomenclatorId: {
            type: 'number',
            nullable: true
        },
        amountOfDigits: {
            type: 'number',
            nullable: true
        },
        isFullyCharged: {type: 'boolean'},
        approved: {type: 'boolean'},
        createdAt: {
            type: 'string',
            nullable: true
        },
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        userDeleted: {
            type: 'string',
            maxLength: 50,
            nullable: true
        },
        deletedAt: {
            type: 'string',
            nullable: true
        }
    }
};
