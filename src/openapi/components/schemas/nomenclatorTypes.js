module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        supervised: {
            type: 'boolean'
        },
        observation: {
            type: 'string'
        },
        domain: {
            type: 'string'
        }
    }
};
