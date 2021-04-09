module.exports = {
    '/api/nomenclatorTypes': {
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
                                    nomenclatorTypes: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/NomenclatorTypes'}
                                    }
                                },
                                example: {
                                    nomenclatorType: [
                                        {
                                            id: 'ACT',
                                            description: 'ACT description',
                                            supervised: false,
                                            observation: 'ACT observation',
                                            domain: 'ACT domain'
                                        },
                                        {
                                            id: 'CCO',
                                            description: 'CCO description',
                                            supervised: false,
                                            observation: 'CCO observation',
                                            domain: 'CCO domain'
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
                content: { 'application/json': {schema: {$ref: '#/components/schemas/NomenclatorTypes'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclatorType: { $ref: '#/components/schemas/NomenclatorTypes'}
                                },
                                example: {
                                    role: {
                                        id: 'ASD',
                                        description: 'ASD description',
                                        observation: 'ASD observation',
                                        domain: 'ASD domain'
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
    '/api/nomenclatorTypes/{id}': {
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
                        maxLength: 10
                    },
                    description: 'Id nomenclatorType to find'
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
                                    role: { $ref: '#/components/schemas/NomenclatorTypes'}
                                },
                                example: {
                                    role: {
                                        id: 'QWE',
                                        description: 'QWE description',
                                        observation: 'QWE observation',
                                        domain: 'QWE domain'
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
                    description: 'Nomenclator Type to update'
                }
            ],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/NomenclatorTypes'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclatorTypes: { $ref: '#/components/schemas/NomenclatorTypes'}
                                },
                                example: {
                                    nomenclatorType: {
                                        id: 'QWE',
                                        description: 'QWE description',
                                        observation: 'QWE observation',
                                        domain: 'QWE domain'
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
                    description: 'Id of nomenclator type to delete'
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
