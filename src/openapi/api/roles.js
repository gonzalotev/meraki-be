module.exports = {
    '/api/roles': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Roles'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    roles: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Roles'}
                                    }
                                },
                                example: {
                                    roles: [
                                        {
                                            id: 'AUDITOR',
                                            description: 'Auditor description',
                                            observation: 'Auditor observation',
                                            domain: 'Auditor domain'
                                        },
                                        {
                                            id: 'SUPERVISOR',
                                            description: 'Supervisor description',
                                            observation: 'Supervisor observation',
                                            domain: 'Supervisor domain'
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
            security: [{bearerAuth: []}],
            tags: ['Roles'],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/Roles'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    role: { $ref: '#/components/schemas/Roles'}
                                },
                                example: {
                                    role: {
                                        id: 'SUPERVISOR',
                                        description: 'Supervisor description',
                                        observation: 'Supervisor observation',
                                        domain: 'Supervisor domain'
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
    '/api/roles/{id}': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Roles'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Id Role to find'
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
                                    role: { $ref: '#/components/schemas/Roles'}
                                },
                                example: {
                                    role: {
                                        id: 'SUPERVISOR',
                                        description: 'Supervisor description',
                                        observation: 'Supervisor observation',
                                        domain: 'Supervisor domain'
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
        put: {
            security: [{bearerAuth: []}],
            tags: ['Roles'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Role to update'
                }
            ],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/Roles'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    role: { $ref: '#/components/schemas/Roles'}
                                },
                                example: {
                                    role: {
                                        id: 'SUPERVISOR',
                                        description: 'Supervisor description',
                                        observation: 'Supervisor observation',
                                        domain: 'Supervisor domain'
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
            security: [{bearerAuth: []}],
            tags: ['Roles'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Id of role to delete'
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
