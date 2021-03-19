module.exports = {
    type: 'object',
    properties: {
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        variableId: {
            type: 'integer'
        },
        description: {
            type: 'string',
            maxLength: 120
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
            format: 'date',
            readOnly: true
        }
    }
};
