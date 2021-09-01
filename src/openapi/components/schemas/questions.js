module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            nullable: false
        },
        question: {
            type: 'string',
            maxLength: 300,
            nullable: false
        },
        approved: {type: 'boolean'},
        observation: {
            type: 'string',
            maxLength: 120
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        createdAt: {
            type: 'string',
            nullable: true
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
