module.exports = {
    '/api/relationshipAutophrasesLetters': {
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['Relationship Autophrases Letters'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    relationships: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                nomenclatorId: { type: 'integer' },
                                                groupId: { type: 'integer' },
                                                nomenclatureGroupId: { type: 'string' },
                                                autophraseId: { type: 'integer' },
                                                observation: { type: 'string' },
                                                domain: { type: 'string' },
                                                approved: { type: 'boolean' },
                                                createdAt: { type: 'string' },
                                                userCreator: { type: 'string' },
                                                userDeleted: { type: 'string' },
                                                deletedAt: { type: 'string' }
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
            tags: ['Relationship Autophrases Letters'],
            requestBody: {
                description: 'The new  type of relationship to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: { type: 'integer' },
                                groupId: { type: 'integer' },
                                nomenclatureGroupId: { type: 'string' },
                                autophraseId: { type: 'integer' },
                                observation: { type: 'string' },
                                domain: { type: 'string' },
                                approved: { type: 'boolean' },
                                createdAt: { type: 'string' },
                                userCreator: { type: 'string' },
                                userDeleted: { type: 'string' },
                                deletedAt: { type: 'string' }
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
                                    relationship: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: { type: 'integer' },
                                            groupId: { type: 'integer' },
                                            nomenclatureGroupId: { type: 'string' },
                                            autophraseId: { type: 'integer' },
                                            observation: { type: 'string' },
                                            domain: { type: 'string' },
                                            approved: { type: 'boolean' },
                                            createdAt: { type: 'string' },
                                            userCreator: { type: 'string' },
                                            userDeleted: { type: 'string' },
                                            deletedAt: { type: 'string' }
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
    '/api/relationshipAutophrasesLetters/{nomenclatorId}/{groupId}/{nomenclatureGroupId}/{autophraseId}': {
        put: {
            security: [{ bearerAuth: [] }],
            tags: ['Relationship Autophrases Letters'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: { type: 'number' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'groupId',
                    required: true,
                    schema: { type: 'number' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureGroupId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'autophraseId',
                    required: true,
                    schema: { type: 'number' },
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new  type of relationship to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: { type: 'integer' },
                                groupId: { type: 'integer' },
                                nomenclatureGroupId: { type: 'string' },
                                autophraseId: { type: 'integer' },
                                observation: { type: 'string' },
                                domain: { type: 'string' },
                                approved: { type: 'boolean' },
                                createdAt: { type: 'string' },
                                userCreator: { type: 'string' },
                                userDeleted: { type: 'string' },
                                deletedAt: { type: 'string' }
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
                                    relationship: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: { type: 'integer' },
                                            groupId: { type: 'integer' },
                                            nomenclatureGroupId: { type: 'string' },
                                            autophraseId: { type: 'integer' },
                                            observation: { type: 'string' },
                                            domain: { type: 'string' },
                                            approved: { type: 'boolean' },
                                            createdAt: { type: 'string' },
                                            userCreator: { type: 'string' },
                                            userDeleted: { type: 'string' },
                                            deletedAt: { type: 'string' }
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
            tags: ['Relationship Types'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: { type: 'number' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'groupId',
                    required: true,
                    schema: { type: 'number' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureGroupId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'autophraseId',
                    required: true,
                    schema: { type: 'number' },
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
            tags: ['Relationship Autophrases Letters'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: { type: 'number' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'groupId',
                    required: true,
                    schema: { type: 'number' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureGroupId',
                    required: true,
                    schema: { type: 'string' },
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'autophraseId',
                    required: true,
                    schema: { type: 'number' },
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
                                    relationship: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: { type: 'integer' },
                                            groupId: { type: 'integer' },
                                            nomenclatureGroupId: { type: 'string' },
                                            autophraseId: { type: 'integer' },
                                            observation: { type: 'string' },
                                            domain: { type: 'string' },
                                            approved: { type: 'boolean' },
                                            createdAt: { type: 'string' },
                                            userCreator: { type: 'string' },
                                            userDeleted: { type: 'string' },
                                            deletedAt: { type: 'string' }
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
    '/api/relationshipAutophrasesLetters/downloadCsv': {
        get: {
            security: [{ bearerAuth: [] }],
            tags: ['Relationship Autophrases Letters'],
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
