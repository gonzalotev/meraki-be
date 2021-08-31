module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            nullable: false
        },
        description: {
            type: 'string',
            maxLength: 120,
            nullable: false
        },
        automatic_yes_no: { type: 'boolean' },
        percentage_to_audit: { type: 'number' },
        acceptable_level_error: { type: 'number' },
        domain: {
            type: 'string',
            maxLength: 300
        },
        observation: {
            type: 'string',
            maxLength: 120
        },
        approved: { type: 'boolean' },
        userCreator: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        createdAt: {
            type: 'string',
            nullable: false
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
