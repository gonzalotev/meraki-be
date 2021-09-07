module.exports = {
    '/api/operativeStructure': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operative Structure'],
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
                                    operativesStructures: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/OperativeStructure'}
                                    },
                                    total: {type: 'number'}
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
            tags: ['Operative Structure'],
            requestBody: {
                description: 'The new Source Questions Relations to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                operativeId: {
                                    type: 'integer',
                                    nullable: false
                                },
                                originalName: {
                                    type: 'string',
                                    maxLength: 50,
                                    nullable: false
                                },
                                entryFieldNameId: {
                                    type: 'string',
                                    maxLength: 30,
                                    nullable: false
                                },
                                originalAuxiliaryFieldId: {
                                    type: 'string',
                                    maxLength: 30,
                                    nullable: true
                                },
                                finalAuxiliaryFieldId: {
                                    type: 'string',
                                    maxLength: 30,
                                    nullable: false
                                },
                                variableDescription: {
                                    type: 'string',
                                    maxLength: 100,
                                    nullable: true
                                },
                                shouldDisplayAuxiliary: {type: 'boolean'},
                                isPartOfTheId: {
                                    type: 'boolean',
                                    nullable: false
                                },
                                datatypeId: {
                                    type: 'string',
                                    maxLength: 1,
                                    nullable: false
                                },
                                dataSize: {
                                    type: 'integer',
                                    nullable: false
                                },
                                hasDecimals: {type: 'boolean'},
                                decimals: { type: 'integer'},
                                initialPosition: {
                                    type: 'integer',
                                    nullable: false
                                },
                                finalPosition: {
                                    type: 'integer',
                                    nullable: false
                                },
                                shouldDataBeConverted: {type: 'boolean'},
                                observation: {
                                    type: 'string',
                                    maxLength: 120,
                                    nullable: true
                                },
                                domain: {
                                    type: 'string',
                                    maxLength: 300,
                                    nullable: true
                                },
                                sourceId: {
                                    type: 'number',
                                    nullable: true
                                },
                                questionId: {
                                    type: 'number',
                                    nullable: true
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {operativeStructure: {$ref: '#/components/schemas/OperativeStructure'}}
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
    '/api/operativeStructure/{operativeId}/{structureId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Operative Structure'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'structureId',
                    required: true,
                    schema: {type: 'number'}
                }
            ],
            requestBody: {
                description: 'The Source Questions Relations to update',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/OperativeStructure'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {operativeStructure: {$ref: '#/components/schemas/OperativeStructure'}}
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
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operative Structure'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'structureId',
                    required: true,
                    schema: {type: 'number'}
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {operativeStructure: {$ref: '#/components/schemas/OperativeStructure'}}
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
            tags: ['Operative Structure'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'structureId',
                    required: true,
                    schema: {type: 'number'}
                }
            ],
            responses: {
                204: {description: 'The resource was deleted successfully.'},
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/operativeStructure/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operative Structure'],
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
