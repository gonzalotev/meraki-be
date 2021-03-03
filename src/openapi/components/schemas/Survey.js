module.exports = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        address: {type: 'number'},
        situation: {type: 'number'},
        dwelling: {$ref: '#/components/schemas/Dwelling'},
        visits: {
            type: 'array',
            items: {$ref: '#/components/schemas/Visit'}
        }
    }
};
