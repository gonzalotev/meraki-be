module.exports = {
    type: 'object',
    properties: {
        userId: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        role: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    maxLength: 50,
                    nullable: false
                },
                description: {
                    type: 'string',
                    maxLength: 120,
                    nullable: false
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
        },
        nomenclator: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    nullable: false
                },
                roleId: {
                    type: 'string',
                    maxLength: 50,
                    nullable: false
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
                approved: {type: 'boolean'}
            }
        },
        statisticalVariable: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    maxLength: 5
                },
                operativeId: {type: 'integer'},
                lotId: {type: 'integer'},
                roleId: {
                    type: 'string',
                    maxLength: 50,
                    nullable: false
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
                approved: {type: 'boolean'}
            }
        }
    }
};
