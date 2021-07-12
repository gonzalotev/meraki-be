module.exports = {
    '/api/relationshipAutophrasesNomenclatures': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Relationship Autophrases Nomenclatures'],
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
                                                autophraseId: {type: 'integer'},
                                                nomenclatorId: {type: 'integer'},
                                                nomenclatureId: {type: 'string'},
                                                createdAt: {type: 'string'},
                                                userCreator: {type: 'string'},
                                                userDeleted: {type: 'string'},
                                                deletedAt: {type: 'string'},
                                                id: {type: 'string'},
                                                nomenclature: {type: 'string'},
                                                variableId: {type: 'integer'},
                                                abbreviation: {type: 'string'},
                                                staticalVariable: {type: 'string'}
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
            tags: ['Relationship Autophrases Nomenclatures'],
            requestBody: {
                description: 'The new  type of relationship to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                autophraseId: {type: 'integer'},
                                nomenclatorId: {type: 'integer'},
                                nomenclatureId: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                userDeleted: {type: 'string'},
                                deletedAt: {type: 'string'},
                                id: {type: 'string'},
                                nomenclature: {type: 'string'},
                                variableId: {type: 'integer'},
                                abbreviation: {type: 'string'},
                                staticalVariable: {type: 'string'}
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
                                    relationship: {
                                        type: 'object',
                                        properties: {
                                            autophraseId: {type: 'integer'},
                                            nomenclatorId: {type: 'integer'},
                                            nomenclatureId: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
                                            deletedAt: {type: 'string'},
                                            id: {type: 'string'},
                                            nomenclature: {type: 'string'},
                                            variableId: {type: 'integer'},
                                            abbreviation: {type: 'string'},
                                            staticalVariable: {type: 'string'}
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
    '/api/relationshipAutophrasesNomenclatures/{autophraseId}/{nomenclatorId}/{nomenclatureId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Relationship Autophrases Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'autophraseId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'integer'},
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
                description: 'The new  type of relationship to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                autophraseId: {type: 'integer'},
                                nomenclatorId: {type: 'integer'},
                                nomenclatureId: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                userDeleted: {type: 'string'},
                                deletedAt: {type: 'string'},
                                id: {type: 'string'},
                                nomenclature: {type: 'string'},
                                variableId: {type: 'integer'},
                                abbreviation: {type: 'string'},
                                staticalVariable: {type: 'string'}
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
                                    relationship: {
                                        type: 'object',
                                        properties: {
                                            autophraseId: {type: 'integer'},
                                            fontId: {type: 'integer'},
                                            questionId: {type: 'integer'},
                                            abreviation: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
                                            deletedAt: {type: 'string'},
                                            id: {type: 'string'},
                                            nomenclature: {type: 'string'},
                                            variableId: {type: 'integer'},
                                            abbreviation: {type: 'string'},
                                            staticalVariable: {type: 'string'}
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
            tags: ['Relationship Types'],
            parameters: [
                {
                    in: 'path',
                    name: 'autophraseId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'integer'},
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
            tags: ['Relationship Autophrases Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'autophraseId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'integer'},
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
                                    relationship: {
                                        type: 'object',
                                        properties: {
                                            autophraseId: {type: 'integer'},
                                            fontId: {type: 'integer'},
                                            questionId: {type: 'integer'},
                                            abreviation: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
                                            deletedAt: {type: 'string'},
                                            id: {type: 'string'},
                                            nomenclature: {type: 'string'},
                                            variableId: {type: 'integer'},
                                            abbreviation: {type: 'string'},
                                            staticalVariable: {type: 'string'}
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
    '/api/relationshipAutophrasesNomenclatures/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Relationship Autophrases Nomenclatures'],
            parameters: [
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
        }
    }
};
