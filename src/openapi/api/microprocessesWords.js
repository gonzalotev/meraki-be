module.exports = {
    '/api/microprocessesWords': {
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesWords'],
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
                                    microprocessesWords: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                idMicroprocess: { type: 'string' },
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
            tags: ['MicroprocessesWords'],
            requestBody: {
                description: 'The new  Microprocesses Word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                idMicroprocess: { type: 'string' },
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
                                    microprocessesWords: {
                                        type: 'object',
                                        properties: {
                                            idMicroprocess: { type: 'string' },
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
    '/api/microprocessesWords/{idMicroprocess}/{idOrder}': {
        put: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesWords'],
            parameters: [
                {
                    in: 'path',
                    name: 'idMicroprocess',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Microprocess id'
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
                description: 'The Microprocesses Word to update',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                idMicroprocess: { type: 'string' },
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
                                    microprocessesWords: {
                                        type: 'object',
                                        properties: {
                                            idMicroprocess: { type: 'string' },
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
            tags: ['MicroprocessesWords'],
            parameters: [
                {
                    in: 'path',
                    name: 'idMicroprocess',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Microprocess id'
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
            tags: ['MicroprocessesWords'],
            parameters: [
                {
                    in: 'path',
                    name: 'idMicroprocess',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Microprocess id'
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
                                    microprocessesWords: {
                                        type: 'object',
                                        properties: {
                                            idMicroprocess: { type: 'string' },
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
    '/api/microprocessesWords/downloadCsv': {
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['MicroprocessesWords'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    microprocessesWords: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/DictionaryLinguistic' }
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
    }
};
