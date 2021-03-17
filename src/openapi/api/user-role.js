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
                                            id_user: 'xxxx-xxxx-xxx-xxxxx',
                                            id_role: 'AUDITOR',
                                            description: 'auditor description',
                                            domain: 'auditor domain',
                                            observation: 'auditor observation',
                                            createdAt: '2021-03-15',
                                            deletedAt: '2021-03-15'
                                        },
                                        {
                                            id_user: 'xxxx-xxxx-xxx-xxxxx',
                                            id_role: 'FAKE',
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
                content: { 'aplication/json': {schema: {$ref: '#/components/schemas/UserRole'}}}
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
                                        id_user: 'xxxx-xxxx-xxx-xxxxx',
                                        id_role: 'FAKE',
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
    }
};
