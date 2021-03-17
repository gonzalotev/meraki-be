module.exports = {
    '/api/user-role': {
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
                                        items: {$ref: '#/components/schemas/UserRole'}
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
                content: { 'application/json': {schema: {$ref: '#/components/schemas/UserRole'}}}
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
                                    userRole: { $ref: '#/components/schemas/UserRole'}
                                },
                                example: {
                                    success: true,
                                    userRole: {
                                        userId: 'xxxx-xxxx-xxx-xxxxx',
                                        roleId: 'FAKE',
                                        description: 'fake description',
                                        domain: 'fake domain',
                                        observation: 'fake observation',
                                        createdAt: '2021-03-15',
                                        deletedAt: null
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
    '/api/user-role/{userId}/{roleId}': {
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
                    name: 'roleId',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Role of the user to update'
                }
            ],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/UserRole'}}}
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
                                    userRole: { $ref: '#/components/schemas/UserRole'}
                                },
                                example: {
                                    success: true,
                                    userRole: {
                                        userId: 'xxxx-xxxx-xxx-xxxxx',
                                        roleId: 'FAKE',
                                        description: 'fake description',
                                        domain: 'fake domain',
                                        observation: 'fake observation',
                                        createdAt: '2021-03-15',
                                        deletedAt: null
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
                    name: 'roleId',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Role of the user to update'
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
        }
    }
};
