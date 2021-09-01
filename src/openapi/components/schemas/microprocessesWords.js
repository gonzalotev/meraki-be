module.exports = {
    type: 'object',
    properties: {
        idMicroprocess: {
            type: 'string',
            maxLength: 10,
            nullable: false
        },
        idOrder: {
            type: 'number',
            nullable: false
        },
        wordOrPhrase: {
            type: 'string',
            maxLength: 120,
            nullable: false
        },
        isWordOrPhrase: { type: 'boolean' },
        observation: {
            type: 'string',
            maxLength: 120
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        approved: { type: 'boolean' },
        userCreator: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        createdAt: {
            type: 'string',
            format: 'date',
            nullable: false
        }
    }
};
