module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            nullable: false
        },
        question: {
            type: 'string',
            nullable: false
        },
        approved: {type: 'boolean'},
        observation: {
            type: 'string',
            nullable: true
        },
        domain: {
            type: 'string',
            nullable: true
        },
        userCreator: {
            type: 'string',
            nullable: false
        },
        createdAt: {
            type: 'string',
            nullable: false,
            example: '2020-12-01'
        }
    }
};
