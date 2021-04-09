module.exports = {
    '/api/typesSpecialPhrases': {
        get: {
            security: [{bearerAuth: []}],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    typesSpecialPhrases: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/TypesSpecialPhrases'}
                                    }
                                },
                                example: {
                                    typesSpecialPhrases: [
                                        {
                                            id: 'id special phrase fake',
                                            description: 'description special phrase fake',
                                            observation: 'observation special phrase fake',
                                            domain: 'domain special phrase fake'
                                        },
                                        {
                                            id: 'id special phrase fake',
                                            description: 'description special phrase fake',
                                            observation: 'observation special phrase fake',
                                            domain: 'domain special phrase fake'
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
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/TypesSpecialPhrases'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    typeSpecialPhrase: { $ref: '#/components/schemas/TypesSpecialPhrases'}
                                },
                                example: {
                                    typeSpecialPhrase: {
                                        id: 'id special phrase fake',
                                        description: 'description special phrase fake',
                                        observation: 'observation special phrase fake',
                                        domain: 'domain special phrase fake'
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
    '/api/typesSpecialPhrases/{id}': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Id Special Phrase to find'
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
                                    typeSpecialPhrase: { $ref: '#/components/schemas/TypesSpecialPhrases'}
                                },
                                example: {
                                    typeSpecialPhrase: {
                                        id: 'id special phrase fake',
                                        description: 'description special phrase fake',
                                        observation: 'observation special phrase fake',
                                        domain: 'domain special phrase fake'
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
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Special Phrase to update'
                }
            ],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/TypesSpecialPhrases'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    typeSpecialPhrase: { $ref: '#/components/schemas/TypesSpecialPhrases'}
                                },
                                example: {
                                    typeSpecialPhrase: {
                                        id: 'id special phrase fake',
                                        description: 'description special phrase fake',
                                        observation: 'observation special phrase fake',
                                        domain: 'domain special phrase fake'
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
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        maxLength: 50
                    },
                    description: 'Id of special phrase to delete'
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
