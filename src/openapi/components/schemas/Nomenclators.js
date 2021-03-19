module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        initial: {
            type: 'string',
            maxLength: 20
        },
        shortDescription: {
            type: 'string',
            maxLength: 60
        },
        longDescription: {
            type: 'string',
            maxLength: 250
        }
    }
};
