module.exports = {
    type: 'object',
    properties: {
        wrong: {
            type: 'string',
            nullable: false,
            maxLength: 120
        },
        right: {
            type: 'string',
            nullable: false,
            maxLength: 120
        },
        isAWord: {
            type: 'boolean',
            nullable: true
        },
        observation: {
            type: 'string',
            maxLength: 120
        },
        approved: {
            type: 'boolean',
            nullable: true
        },
        frequency: {
            type: 'integer',
            nullable: true
        },
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
