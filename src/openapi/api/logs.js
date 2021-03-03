module.exports = {
    '/api/logs/': {
        post: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getLogs',
            description: 'Return list of logs',
            requestBody: {
                description: 'get logs',
                content: {'application/json': {schema: {$ref: '#/components/schemas/Log'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    logs: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Log'}
                                    },
                                    count: {type: 'number'}
                                }
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
