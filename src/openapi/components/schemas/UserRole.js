module.exports = {
    type: 'object',
    properties: {
        id_user: {
            type: 'number',
            minimum: 1
        },
        id_role: {
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
        }
    }
};
