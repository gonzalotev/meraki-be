module.exports = {
    '/api/operatives': {
        get: {
            summary: 'List of operatives',
            security: [],
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
                                            description: 'Operativo EPH 2do trimestre 2020',
                                            observation: null,
                                            domain: null,
                                            dateArrival: null,
                                            totalRecords: null,
                                            contact: null,
                                            contactEmail: null,
                                            encodingStartDate: null,
                                            encodingEndDate: null,
                                            deliveryStartDate: null,
                                            eraseStartDate: null,
                                            eraseEndDate: null,
                                            totalQuality: null,
                                            errorLevel: null,
                                            userId: 1,
                                            createdAt: '2021-02-08'
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
        },
        delete: {
            summary: 'Delete an operative by id',
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
                    description: 'Ok',
                    content: { 'application/json': {schema: { $ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
