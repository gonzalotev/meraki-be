module.exports = {
    type: 'object',
    properties: {
        originalDescription: {
            type: 'string',
            maxLength: 50
        },
        typologyDictionaryId: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        variableId: {
            type: 'string',
            maxLength: 120,
            nullable: false
        },
        destinationDescription: {
            type: 'string',
            maxLength: 120,
            nullable: true
        },
        observation: {
            type: 'string',
            maxLength: 120,
            nullable: true
        },
        domain: {
            type: 'string',
            maxLength: 300,
            nullable: true
        },
        createdAt: {
            type: 'string',
            format: 'date'
        },
        deletedAt: {
            type: 'string',
            format: 'date',
            nullable: true
        }
    }
};
