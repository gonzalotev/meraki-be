module.exports = {
    type: 'object',
    properties: {
        operativeId: {
            type: 'integer'
        },
        lotId: {
            type: 'integer'
        },
        description: {
            type: 'string',
            maxLength: 120
        }
    }
};
