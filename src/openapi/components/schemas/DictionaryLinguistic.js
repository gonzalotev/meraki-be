module.exports = {
    type: 'object',
    properties: {
        original_description: {
            type: 'string',
            maxLength: 50
        },
        id_tipology_dictionary: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        id_variable: {
            type: 'string',
            maxLength: 120,
            nullable: false
        },
        destination_description: {
            type: 'string',
            maxLength: 120,
            nullable: true
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
        },
        createdAt: {
            type: 'string',
            format: 'date'
        },
        deletedAt: {
            type: 'string',
            format: 'date',
            nullable: true
        }
    }
};
