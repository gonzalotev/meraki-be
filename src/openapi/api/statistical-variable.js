module.exports = {
    '/api/statistical-variable': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 1,
                        minimum: 1
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    userRoles: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/StatisticalVariable'}
                                    }
                                },
                                example: {
                                    userRoles: [
                                        {
                                            userId: 'xxxx-xxxx-xxx-xxxxx',
                                            roleID: 'AUDITOR',
                                            description: 'auditor description',
                                            domain: 'auditor domain',
                                            observation: 'auditor observation',
                                            createdAt: '2021-03-15',
                                            deletedAt: '2021-03-15'
                                        },
                                        {
                                            userId: 'xxxx-xxxx-xxx-xxxxx',
                                            roleId: 'FAKE',
                                            description: 'fake description',
                                            domain: 'fake domain',
                                            observation: 'fake observation',
                                            createdAt: '2021-03-15',
                                            deletedAt: null
                                        }
                                    ]
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
            security: [
                {bearerAuth: []}
            ],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/StatisticalVariable'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean'},
                                    statisticalVariable: { $ref: '#/components/schemas/StatisticalVariable'}
                                },
                                example: {
                                    success: true,
                                    statisticalVariable: {
                                        userId: 'xxxx-xxxx-xxx-xxxxx',
                                        variableId: 'FAKE',
                                        name: 'fake description',
                                        domain: 'fake domain',
                                        observation: 'fake observation',
                                        createdAt: '2021-03-15'
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
        }
    },
    '/api/statistical-variable/{userId}/{variableId}': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'userId',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Id of the user to update'
                },
                {
                    in: 'path',
                    name: 'variableId',
                    required: true,
                    schema: {
                        type: 'integer'
                    },
                    description: 'Variable of the user to update'
                }
            ],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/StatisticalVariable'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean'},
                                    statisticalVariable: { $ref: '#/components/schemas/StatisticalVariable'}
                                },
                                example: {
                                    success: true,
                                    statisticalVariable: {
                                        userId: 'xxxx-xxxx-xxx-xxxxx',
                                        variableId: 'FAKE',
                                        name: 'fake description',
                                        domain: 'fake domain',
                                        observation: 'fake observation',
                                        createdAt: '2021-03-15'
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
        delete: {
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'userId',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Id of the user to update'
                },
                {
                    in: 'path',
                    name: 'variableId',
                    required: true,
                    schema: {
                        type: 'integer'
                    },
                    description: 'Variable of the user to update'
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': { schema: { $ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        get: {
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'userId',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Id of the user to update'
                },
                {
                    in: 'path',
                    name: 'variableId',
                    required: true,
                    schema: {
                        type: 'integer'
                    },
                    description: 'Variable of the user to update'
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {statisticalVariable: { $ref: '#/components/schemas/StatisticalVariable'}},
                                example: {
                                    statisticalVariable: {
                                        userId: 'xxxx-xxxx-xxx-xxxxx',
                                        variableId: 'FAKE',
                                        name: 'fake description',
                                        domain: 'fake domain',
                                        observation: 'fake observation',
                                        createdAt: '2021-03-15'
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
        }
    }
};
