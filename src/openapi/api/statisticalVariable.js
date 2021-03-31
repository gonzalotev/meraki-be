module.exports = {
    '/api/statisticalVariable': {
        get: {
            summary: 'List of statistics variables',
            security: [
                {bearerAuth: []}
            ],
            tags: ['Statistical Variable'],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    statisticalVariables: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/StatisticalVariable'}
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
            summary: 'Create new variable estadistica',
            security: [
                {bearerAuth: []}
            ],
            tags: ['Statistical Variable'],
            requestBody: {
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/StatisticalVariable'}}}
            },
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    insertedOne: {$ref: '#/components/schemas/StatisticalVariable'}
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/statisticalVariable/{id}': {
        get: {
            summary: 'Update variable estadistica',
            security: [
                {bearerAuth: []}
            ],
            tags: ['Statistical Variable'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'}
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    statisticalVariable: {$ref: '#/components/schemas/StatisticalVariable'}
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
        put: {
            summary: 'Update variable estadistica',
            security: [
                {bearerAuth: []}
            ],
            tags: ['Statistical Variable'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'}
                }
            ],
            requestBody: {
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/StatisticalVariable'}}}
            },
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    updatedOne: {$ref: '#/components/schemas/StatisticalVariable'}
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
