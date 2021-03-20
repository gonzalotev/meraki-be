module.exports = {
    '/api/static-data': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            summary: 'Get static values',
            description: `**Get** all the basic data of the application, *eg*: role types.
                            To get data, just send the resource name equal to true.
                            eg: /api/static-data?role=true`,
            parameters: [
                {
                    in: 'query',
                    name: 'role',
                    required: false,
                    schema: {
                        type: 'boolean'
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
                                    roles: {
                                        type: 'array',
<<<<<<< HEAD
                                        items: { $ref: '#/components/schemas/Role'}
=======
                                        items: { $ref: '#/components/schemas/RoleType'}
>>>>>>> feat: create dictionary linguistic endpoint
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
                                            userDestroyer: null
                                        },
                                        {
                                            id: 'SUPERVISOR',
                                            description: 'Supervisor description',
                                            observation: 'Supervisor observation',
                                            domain: 'Supervisor domain',
                                            createdAt: '2021-03-15',
                                            deletedAt: '2021-03-16',
                                            userCreator: 1,
                                            userDestroyer: 2
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
<<<<<<< HEAD
    },
    '/api/static-data/variable-stadistics': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    variableStadistics: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/VariableStadistics'}
                                    }
                                },
                                example: {
                                    variableStadistics: [
                                        {
                                            id: 'FAKE',
                                            name: 'fake description',
                                            abbreviation: 'fake abbreviation',
                                            domain: 'fake domain',
                                            observation: 'fake observation'
                                        },
                                        {
                                            id: 'FAKE',
                                            name: 'fake description',
                                            abbreviation: 'fake abbreviation',
                                            domain: 'fake domain',
                                            observation: 'fake observation'
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
    '/api/static-data/shortDescription': {
        get: {
            security: [
                {bearerAuth: []}
            ],
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
                                        items: {$ref: '#/components/schemas/Nomenclators'}
                                    }
                                },
                                example: {
                                    nomenclators: [
                                        {
                                            id: 'fake id',
                                            initial: 'fake initial',
                                            shortDescription: 'fake short description',
                                            longDescription: 'fake long description'
                                        },
                                        {
                                            id: 'fake id',
                                            initial: 'fake initial',
                                            shortDescription: 'fake short description',
                                            longDescription: 'fake long description'
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
    '/api/static-data/lots': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    lots: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Lots'}
                                    }
                                },
                                example: {
                                    lots: [
                                        {
                                            operativeId: 'fake operativeId',
                                            lotId: 'fake lotId',
                                            description: 'fake description'
                                        },
                                        {
                                            operativeId: 'fake operativeId',
                                            lotId: 'fake lotId',
                                            description: 'fake description'
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
=======
>>>>>>> feat: create dictionary linguistic endpoint
    }
};
