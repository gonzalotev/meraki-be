module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
            maximum: 999
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
