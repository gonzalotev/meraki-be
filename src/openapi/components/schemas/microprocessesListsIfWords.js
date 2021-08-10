module.exports = {
    type: 'object',
    properties: {
        idLists: {
            type: 'number',
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
