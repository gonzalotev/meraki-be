module.exports = {
    '/api/staticData': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static values',
            description: `**Get** all the basic data of the application, *eg*: role types.
                            To get data, just send the resource name equal to true.
                            eg: /api/staticData?role=true`,
            parameters: [
                {
                    in: 'query',
                    name: 'roles',
                    required: false,
                    schema: {type: 'boolean'}
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
                                            domain: 'Auditor domain',
                                            createdAt: '2021-03-15',
                                            deletedAt: null,
                                            userCreator: 1,
                                            userDeleted: null
                                        },
                                        {
                                            id: 'SUPERVISOR',
                                            description: 'Supervisor description',
                                            observation: 'Supervisor observation',
                                            domain: 'Supervisor domain',
                                            createdAt: '2021-03-15',
                                            deletedAt: '2021-03-16',
                                            userCreator: 1,
                                            userDeleted: 2
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
        }
    },
    '/api/staticData/shortDescription': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static nomenclatorsvalues',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Roles'}
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
    '/api/staticData/lots': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static lots values',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Roles'}
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
    '/api/staticData/roles': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static roles values',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Roles'}
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
    '/api/staticData/statisticalVariable': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static roles values',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Roles'}
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
