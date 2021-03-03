module.exports = {
    '/api/monitoring': {
        post: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getMonitoringProgress',
            description: 'Return monitoring progress',
            requestBody: {
                description: 'get monitoring progress',
                content: {'application/json': {schema: {$ref: '#/components/schemas/Monitoring'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/Monitoring'}
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
