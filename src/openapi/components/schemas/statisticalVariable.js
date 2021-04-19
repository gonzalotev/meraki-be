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
        digits: {
            type: 'integer',
            maxLength: 1
        },
        abbreviation: {
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
