module.exports = {
    type: 'object',
    properties: {
        originalDescription: {
            type: 'string',
            maxLength: 300,
            nullable: false
        },
        dictionaryTypeId: {
            type: 'string',
            maxLength: 3,
            nullable: false
        },
        variableId: {
            type: 'string',
            maxLength: 5,
            nullable: false
        },
        destinationDescription: {
            type: 'string',
            maxLength: 300
        },
        observation: {
            type: 'string',
            maxLength: 120
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        approved: {type: 'boolean'},
        createdAt: {
            type: 'string',
            format: 'date',
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
            format: 'date',
            nullable: true
        }
    }
};
