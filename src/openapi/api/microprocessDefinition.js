module.exports = {
    '/api/microprocessDefinition': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocess Definition'],
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
                                    microprocesses: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/MicroprocessDefinition'}
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
            tags: ['Microprocess Definition'],
            requestBody: {
                description: 'The new  dictionary linguistic to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                variableId: {
                                    type: 'string',
                                    nullable: false,
                                    maxLength: 5
                                },
                                order: {type: 'number'},
                                description: {
                                    type: 'string',
                                    nullable: false,
                                    maxLength: 120
                                },
                                observation: {
                                    type: 'string',
                                    nullable: true,
                                    maxLength: 120
                                },
                                domain: {
                                    type: 'string',
                                    nullable: true,
                                    maxLength: 300
                                },
                                dictionaryTypeId: {
                                    type: 'string',
                                    nullable: false,
                                    maxLength: 3
                                },
                                nomenclatorId: {
                                    type: 'number',
                                    nullable: true
                                },
                                amountOfDigits: {
                                    type: 'number',
                                    nullable: true
                                },
                                isFullyCharged: {type: 'boolean'},
                                approved: {type: 'boolean'}
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
                                properties: {microprocess: {$ref: '#/components/schemas/MicroprocessDefinition'}}
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
    '/api/microprocessDefinition/{id}': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocess Definition'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'}
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {microprocess: {$ref: '#/components/schemas/MicroprocessDefinition'}}
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
            tags: ['Microprocess Definition'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'}
                }
            ],
            requestBody: {
                description: 'The new  dictionary linguistic to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                variableId: {
                                    type: 'string',
                                    nullable: false,
                                    maxLength: 5
                                },
                                order: {type: 'number'},
                                description: {
                                    type: 'string',
                                    nullable: false,
                                    maxLength: 120
                                },
                                observation: {
                                    type: 'string',
                                    nullable: true,
                                    maxLength: 120
                                },
                                domain: {
                                    type: 'string',
                                    nullable: true,
                                    maxLength: 300
                                },
                                dictionaryTypeId: {
                                    type: 'string',
                                    nullable: false,
                                    maxLength: 3
                                },
                                nomenclatorId: {
                                    type: 'number',
                                    nullable: true
                                },
                                amountOfDigits: {
                                    type: 'number',
                                    nullable: true
                                },
                                isFullyCharged: {type: 'boolean'},
                                approved: {type: 'boolean'}
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {microprocess: {$ref: '#/components/schemas/MicroprocessDefinition'}}
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
            tags: ['Microprocess Definition'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'}
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
    }
};
