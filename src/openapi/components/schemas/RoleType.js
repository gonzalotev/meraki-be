module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        description: {
            type: 'string',
            maxLength: 120,
            nullable: false
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
        },
        userCreator: {
            type: 'string',
            readOnly: true
        },
        userDeleted: {
            type: 'string',
            readOnly: true
        }
    }
};
