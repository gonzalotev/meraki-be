module.exports = {
    type: 'object',
    properties: {
        userId: {
            type: 'string',
            maxLength: 50
        },
        roleId: {
            type: 'string',
            maxLength: 50
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
        },
        deletedAt: {
            type: 'string',
            format: 'date',
            nullable: true,
            readOnly: true
        }
    }
};
