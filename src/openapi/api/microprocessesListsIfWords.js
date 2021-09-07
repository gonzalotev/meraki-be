module.exports = {
    '/api/microprocessesListsIfWords': {
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesListsIfWords'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'number',
                        default: 1
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
                                    microprocessesListsIfWords: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                idLists: { type: 'string' },
                                                idOrder: { type: 'string' },
                                                wordOrPhrase: { type: 'string' },
                                                isWordOrPhrase: { type: 'boolean' },
                                                observation: { type: 'string' },
                                                domain: { type: 'string' },
                                                approved: { type: 'boolean' },
                                                userCreator: { type: 'string' },
                                                createdAt: { type: 'string' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        },
        post: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesListsIfWords'],
            requestBody: {
                description: 'The new  Microprocesses Lists If Word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                idLists: { type: 'string' },
                                idOrder: { type: 'string' },
                                wordOrPhrase: { type: 'string' },
                                isWordOrPhrase: { type: 'boolean' },
                                observation: { type: 'string' },
                                domain: { type: 'string' },
                                approved: { type: 'boolean' },
                                userCreator: { type: 'string' },
                                createdAt: { type: 'string' }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    microprocessesListsIfWords: {
                                        type: 'object',
                                        properties: {
                                            idLists: { type: 'string' },
                                            idOrder: { type: 'string' },
                                            wordOrPhrase: { type: 'string' },
                                            isWordOrPhrase: { type: 'boolean' },
                                            observation: { type: 'string' },
                                            domain: { type: 'string' },
                                            approved: { type: 'boolean' },
                                            userCreator: { type: 'string' },
                                            createdAt: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        }
    },
    '/api/microprocessesListsIfWords/{idLists}/{idOrder}': {
        put: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesListsIfWords'],
            parameters: [
                {
                    in: 'path',
                    name: 'idLists',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'Lists id'
                },
                {
                    in: 'path',
                    name: 'idOrder',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'Order id'
                }
            ],
            requestBody: {
                description: 'The new Microprocesses Lists If Word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                idLists: { type: 'string' },
                                idOrder: { type: 'string' },
                                wordOrPhrase: { type: 'string' },
                                isWordOrPhrase: { type: 'boolean' },
                                observation: { type: 'string' },
                                domain: { type: 'string' },
                                approved: { type: 'boolean' },
                                userCreator: { type: 'string' },
                                createdAt: { type: 'string' }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean' },
                                    microprocessesListsIfWords: {
                                        type: 'object',
                                        properties: {
                                            idLists: { type: 'string' },
                                            idOrder: { type: 'string' },
                                            wordOrPhrase: { type: 'string' },
                                            isWordOrPhrase: { type: 'boolean' },
                                            observation: { type: 'string' },
                                            domain: { type: 'string' },
                                            approved: { type: 'boolean' },
                                            userCreator: { type: 'string' },
                                            createdAt: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        },
        delete: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesListsIfWords'],
            parameters: [
                {
                    in: 'path',
                    name: 'idLists',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'Lists id'
                },
                {
                    in: 'path',
                    name: 'idOrder',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'Order id'
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } }
                },
                default: {
                    description: 'Error',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        },
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesListsIfWords'],
            parameters: [
                {
                    in: 'path',
                    name: 'idLists',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'Lists id'
                },
                {
                    in: 'path',
                    name: 'idOrder',
                    required: true,
                    schema: { type: 'integer' },
                    description: 'Order id'
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
                                    microprocessesListsIfWords: {
                                        type: 'object',
                                        properties: {
                                            idLists: { type: 'string' },
                                            idOrder: { type: 'string' },
                                            wordOrPhrase: { type: 'string' },
                                            isWordOrPhrase: { type: 'boolean' },
                                            observation: { type: 'string' },
                                            domain: { type: 'string' },
                                            approved: { type: 'boolean' },
                                            userCreator: { type: 'string' },
                                            createdAt: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        }
    },
    '/api/microprocessesListsIfWords/downloadCsv': {
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesListsIfWords'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'text/csv': {
                            schema: {type: 'string', format: 'binary'}
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
