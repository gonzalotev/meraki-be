module.exports = {
    '/api/static-data': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            description: 'Return data preload',
            parameters: [
                {
                    in: 'query',
                    name: 'role',
                    required: false,
                    schema: {type: 'boolean'}
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: { roles: { type: 'array'}}
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
