module.exports = {
    '/api/nomenclatures': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Nomenclatures'],
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
                    schema: {
                        type: 'string'
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
                                    nomenclators: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                nomenclatorId: {type: 'string'},
                                                nomenclatureId: {type: 'string'},
                                                observation: {type: 'string'},
                                                description: {type: 'string'},
                                                abbreviation: {type: 'string'},
                                                original: {type: 'string'},
                                                fractionalWord: {type: 'boolean'},
                                                coefficient: {type: 'string'},
                                                fatherNomenclatorId: {type: 'string'},
                                                fatherNomenclatureId: {type: 'string'},
                                                acronym: {type: 'string'},
                                                domain: {type: 'string'},
                                                approved: {type: 'boolean'},
                                                createdAt: {type: 'string'},
                                                userCreator: {type: 'string'},
                                                userDeleted: {type: 'string'},
                                                deletedAt: {type: 'string'}
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
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        post: {
            security: [{bearerAuth: []}],
            tags: ['Nomenclatures'],
            requestBody: {
                description: 'The new  type of nomenclator to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: {type: 'string'},
                                nomenclatureId: {type: 'string'},
                                observation: {type: 'string'},
                                description: {type: 'string'},
                                abbreviation: {type: 'string'},
                                original: {type: 'string'},
                                fractionalWord: {type: 'boolean'},
                                coefficient: {type: 'string'},
                                fatherNomenclatorId: {type: 'string'},
                                fatherNomenclatureId: {type: 'string'},
                                acronym: {type: 'string'},
                                domain: {type: 'string'},
                                approved: {type: 'boolean'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                userDeleted: {type: 'string'},
                                deletedAt: {type: 'string'}
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
                                    success: {type: 'boolean'},
                                    nomenclator: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            observation: {type: 'string'},
                                            description: {type: 'string'},
                                            abbreviation: {type: 'string'},
                                            original: {type: 'string'},
                                            fractionalWord: {type: 'boolean'},
                                            fatherNomenclatorId: {type: 'string'},
                                            fatherNomenclatureId: {type: 'string'},
                                            acronym: {type: 'string'},
                                            coefficient: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
                                            deletedAt: {type: 'string'}
                                        }
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
    '/api/nomenclatures/{nomenclatorId}/{nomenclatureId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new  type of nomenclator to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: {type: 'string'},
                                nomenclatureId: {type: 'string'},
                                observation: {type: 'string'},
                                description: {type: 'string'},
                                abbreviation: {type: 'string'},
                                original: {type: 'string'},
                                fractionalWord: {type: 'boolean'},
                                coefficient: {type: 'string'},
                                fatherNomenclatorId: {type: 'string'},
                                fatherNomenclatureId: {type: 'string'},
                                acronym: {type: 'string'},
                                domain: {type: 'string'},
                                approved: {type: 'boolean'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                userDeleted: {type: 'string'},
                                deletedAt: {type: 'string'}
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
                                    success: {type: 'boolean'},
                                    nomenclator: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            observation: {type: 'string'},
                                            description: {type: 'string'},
                                            abbreviation: {type: 'string'},
                                            original: {type: 'string'},
                                            fractionalWord: {type: 'boolean'},
                                            fatherNomenclatorId: {type: 'string'},
                                            fatherNomenclatureId: {type: 'string'},
                                            acronym: {type: 'string'},
                                            coefficient: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
                                            deletedAt: {type: 'string'}
                                        }
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
            security: [{bearerAuth: []}],
            tags: ['Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {'application/json': { schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        get: {
            security: [{bearerAuth: []}],
            tags: ['Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'string'},
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
                                    nomenclator: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            observation: {type: 'string'},
                                            description: {type: 'string'},
                                            abbreviation: {type: 'string'},
                                            original: {type: 'string'},
                                            fractionalWord: {type: 'boolean'},
                                            fatherNomenclatorId: {type: 'string'},
                                            fatherNomenclatureId: {type: 'string'},
                                            acronym: {type: 'string'},
                                            coefficient: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
                                            deletedAt: {type: 'string'}
                                        }
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
    '/api/nomenclatures/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
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
        }
    }
};
