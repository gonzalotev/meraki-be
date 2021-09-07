module.exports = {
    '/api/dictionaryLinguistic': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Dictionary Linguistic'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'number',
                        default: 1
                    }
                },
                {
                    in: 'query',
                    name: 'search',
                    required: false,
                    schema: {type: 'string'}
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
                                    dictionaryLinguistics: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/DictionaryLinguistic'}
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
        post: {
            security: [{bearerAuth: []}],
            tags: ['Dictionary Linguistic'],
            requestBody: {
                description: 'The new  dictionary linguistic to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                originalDescription: {type: 'string'},
                                dictionaryTypeId: {type: 'string'},
                                variableId: {type: 'string'},
                                destinationDescription: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
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
                                properties: {dictionaryLinguistic: {$ref: '#/components/schemas/DictionaryLinguistic'}}
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
            tags: ['Dictionary Linguistic'],
            requestBody: {
                description: 'The new  dictionary linguistic to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                originalDescription: {type: 'string'},
                                dictionaryTypeId: {type: 'string'},
                                variableId: {type: 'string'},
                                dictionary: {
                                    type: 'object',
                                    properties: {
                                        originalDescription: {type: 'string'},
                                        dictionaryTypeId: {type: 'string'},
                                        variableId: {type: 'string'},
                                        destinationDescription: {type: 'string'},
                                        observation: {type: 'string'},
                                        domain: {type: 'string'},
                                        approved: {type: 'boolean'}
                                    }
                                }
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
                                properties: {dictionaryLinguistic: {$ref: '#/components/schemas/DictionaryLinguistic'}}
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
    '/api/dictionaryLinguistic/{originalDescription}/{dictionaryTypeId}/{variableId}': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Dictionary Linguistic'],
            parameters: [
                {
                    in: 'path',
                    name: 'originalDescription',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'dictionaryTypeId',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'variableId',
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
                                properties: {dictionaryLinguistic: {$ref: '#/components/schemas/DictionaryLinguistic'}}
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
            tags: ['Dictionary Linguistic'],
            parameters: [
                {
                    in: 'path',
                    name: 'originalDescription',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'dictionaryTypeId',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'variableId',
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
    },
    '/api/dictionaryLinguistic/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Dictionary Linguistic'],
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
