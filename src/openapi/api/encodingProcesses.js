module.exports = {
    '/api/encodingProcesses': {
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['Procesos de Codificacion'],
            parameters: [
                {
                    in: 'query',
                    name: 'sourceId',
                    required: false,
                    schema: { type: 'number' }
                },
                {
                    in: 'query',
                    name: 'questionId',
                    required: false,
                    schema: { type: 'number' }
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
                                    encodingProcesses: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string' },
                                                description: { type: 'string' },
                                                automatic_yes_no: { type: 'boolean' },
                                                percentage_to_audit: { type: 'string' },
                                                acceptable_level_error: { type: 'string' },
                                                domain: { type: 'string' },
                                                observation: { type: 'string' },
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
            tags: ['Procesos de Codificacion'],
            requestBody: {
                description: 'The new  Encoding Processes to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                description: { type: 'string' },
                                automatic_yes_no: { type: 'boolean' },
                                percentage_to_audit: { type: 'string' },
                                acceptable_level_error: { type: 'string' },
                                domain: { type: 'string' },
                                observation: { type: 'string' },
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
                                    encodingProcess: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            description: { type: 'string' },
                                            automatic_yes_no: { type: 'boolean' },
                                            percentage_to_audit: { type: 'string' },
                                            acceptable_level_error: { type: 'string' },
                                            domain: { type: 'string' },
                                            observation: { type: 'string' },
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
    '/api/encodingProcesses/{id}': {
        put: {
            security: [{ bearerAuth: [] }],
            tags: ['Procesos de Codificacion'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new Encoding Processes to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                description: { type: 'string' },
                                automatic_yes_no: { type: 'boolean' },
                                percentage_to_audit: { type: 'string' },
                                acceptable_level_error: { type: 'string' },
                                domain: { type: 'string' },
                                observation: { type: 'string' },
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
                                    encodingProcess: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            description: { type: 'string' },
                                            automatic_yes_no: { type: 'boolean' },
                                            percentage_to_audit: { type: 'string' },
                                            acceptable_level_error: { type: 'string' },
                                            domain: { type: 'string' },
                                            observation: { type: 'string' },
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
            tags: ['Procesos de Codificacion'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                    description: 'User id of assignment'
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
            tags: ['Procesos de Codificacion'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                    description: 'User id of assignment'
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
                                    encodingProcess: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            description: { type: 'string' },
                                            automatic_yes_no: { type: 'boolean' },
                                            percentage_to_audit: { type: 'string' },
                                            acceptable_level_error: { type: 'string' },
                                            domain: { type: 'string' },
                                            observation: { type: 'string' },
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
    '/api/encodingProcesses/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            operationId: 'downloadencodingProcessesCSV',
            description: 'Returns encodingProcesses in csv format',
            tags: ['Procesos de Codificacion'],
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
