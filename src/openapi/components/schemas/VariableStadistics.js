module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'integer'
        },
        name: {
            type: 'string',
            maxLength: 120
        },
        abbreviature: {
            type: 'string',
            maxLength: 30
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
        }
    }
};
