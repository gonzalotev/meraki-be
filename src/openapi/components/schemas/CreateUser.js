module.exports = {
    type: 'object',
    properties: {
        username: {
            description: 'Username.',
            type: 'string'
        },
        name: {
            description: 'Name.',
            type: 'string',
            pattern: '^([a-zA-ZÀ-ÿ\u00f1\u00d1]{3,25}\\s?){1,4}$'
        },
        surname: {
            description: 'Surname.',
            type: 'string',
            pattern: '^([a-zA-ZÀ-ÿ\u00f1\u00d1]{3,25}\\s?){1,4}$'
        },
        documentId: {
            description: 'Document or CUIT.',
            pattern: '^\\d{5,8}$',
            type: 'string'
        },
        email: {
            description: 'Email.',
            type: 'string',
            format: 'email'
        },
        attributes: {
            type: 'object',
            required: [
                'stateId',
                'phone'
            ],
            properties: {
                stateId: {type: 'string'},
                phone: {
                    type: 'string',
                    description: 'Teléfono con código de area',
                    pattern: '^\\d{8,17}$'
                },
                cuit: {
                    nullable: true,
                    type: 'string',
                    pattern: '^\\d{11}$'
                }
            }
        },
        roles: {
            type: 'array',
            description: 'Roles of the census minimum required its 1 and shall be uniq',
            uniqueItems: true,
            minItems: 1,
            maxItems: 1,
            items: {type: 'string'}

        },
        deleted: {
            type: 'boolean',
            default: false,
            description: 'If the user its deleted from the census'
        }
    },
    required: [
        'name',
        'surname',
        'documentId',
        'roles',
        'email',
        'attributes'
    ]
};
