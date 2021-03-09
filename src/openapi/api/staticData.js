module.exports = {
    '/api/staticData': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getStaticData',
            description: 'Return data preload',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {}
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
