module.exports = {
    type: 'object',
    properties: {
        survey: {type: 'number'},
        dwellingResponse: {
            type: 'object',
            properties: {
                response: {type: 'number'},
                noResponseReason: {type: 'number'},
                status: {type: 'number'}
            }
        },
        dwellingComments: {
            type: 'object',
            properties: {
                comments: {type: 'string'}
            }
        },
        metadata: {
            type: 'object',
            properties: {
                entity: {type: 'string'}
            }
        },
        households: {
            type: 'array',
            items: {$ref: '#/components/schemas/Household'}
        }
    }
};
