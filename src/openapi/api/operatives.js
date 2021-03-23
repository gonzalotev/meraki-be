module.exports = {
    '/api/operatives': {
        get: {
            summary: 'List of operatives',
            security: [
                {bearerAuth: []}
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    operatives: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Operatives'},
                                        example: [{
                                            id: 1,
                                            sourceId: 1,
                                            description: 'Fake description',
                                            observation: null,
                                            domain: null,
                                            dateArrival: null,
                                            totalRecords: null,
                                            contact: null,
                                            contactEmail: null,
                                            encodingStartDate: '2021-01-27 10:42:17',
                                            encodingEndDate: null,
                                            deliveryStartDate: '2021-01-27 10:42:17',
                                            eraseStartDate: '2021-01-27 10:42:17',
                                            eraseEndDate: '2021-01-27 10:42:17',
                                            totalQuality: null,
                                            errorLevel: null,
                                            userId: 'xxxxxx-xxxx-xxx-xxxxx',
                                            createdAt: '2021-01-27 10:42:17'
                                        }]
                                    }
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
        },
        post: {
            summary: 'Create new operative',
            security: [
                {bearerAuth: []}
            ],
            requestBody: {
                description: 'The new operative',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/Operatives'}}}
            },
            responses: {
                200: {
                    description: 'ok',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/operatives/{id}': {
        get: {
            summary: 'Find an operative by id',
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'integer'}
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: { operative: {$ref: '#/components/schemas/Operatives'}}
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        put: {
            summary: 'Update operative',
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'integer'}
                }
            ],
            requestBody: {
                description: 'Data to update',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/Operatives'}}}
            },
            responses: {
                200: {
                    description: 'Ok',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
