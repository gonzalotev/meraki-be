module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        observation: {
            type: 'string'
        },
        domain: {
            type: 'string'
        },
        createdAt: {

        },
        deletedAt: {

        },
        userCreator: {
            type: 'string'
        },
        userDestroyer: {
            type: 'string'
        }
    },
    required: ['id']
};
