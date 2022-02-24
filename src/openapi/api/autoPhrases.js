module.exports = {
    '/api/autoPhrases': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Auto Phrases'],
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
                                    prhases: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {type: 'string'},
                                                variableId: {type: 'string'},
                                                finalPhrase: {type: 'string'},
                                                observation: {type: 'string'},
                                                domain: {type: 'string'},
                                                approved: {type: 'boolean'},
                                                prhaseRetro: {type: 'boolean'},
                                                dateRetro: {type: 'string'},
                                                dependId: {type: 'string'},
                                                createdAt: {type: 'string'},
                                                userCreator: {type: 'string'},
                                                specialOrGeneralPhrase: {type: 'boolean'},
                                                orden: {type: 'number'},
                                                nomenclatorToEncodeId: {type: 'string'},
                                                numberOfNomenclatures: {type: 'string'},
                                                numberOfAgrupations: {type: 'string'}
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
            tags: ['Auto Phrases'],
            requestBody: {
                description: 'The new autophrase to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                variableId: {type: 'string'},
                                finalPhrase: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                approved: {type: 'boolean'},
                                prhaseRetro: {type: 'boolean'},
                                dateRetro: {type: 'string'},
                                dependId: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                specialOrGeneralPhrase: {type: 'boolean'},
                                orden: {type: 'number'},
                                nomenclatorToEncodeId: {type: 'string'},
                                numberOfNomenclatures: {type: 'string'},
                                numberOfAgrupations: {type: 'string'}
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
                                    prhase: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            variableId: {type: 'string'},
                                            finalPhrase: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            prhaseRetro: {type: 'boolean'},
                                            dateRetro: {type: 'string'},
                                            dependId: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            specialOrGeneralPhrase: {type: 'boolean'},
                                            orden: {type: 'number'},
                                            nomenclatorToEncodeId: {type: 'string'},
                                            numberOfNomenclatures: {type: 'string'},
                                            numberOfAgrupations: {type: 'string'}
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
    '/api/autoPhrases/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['AutoPhrases'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new autophrase to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                variableId: {type: 'string'},
                                finalPhrase: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                approved: {type: 'boolean'},
                                prhaseRetro: {type: 'boolean'},
                                dateRetro: {type: 'string'},
                                dependId: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                specialOrGeneralPhrase: {type: 'boolean'},
                                orden: {type: 'number'},
                                nomenclatorToEncodeId: {type: 'string'},
                                numberOfNomenclatures: {type: 'string'},
                                numberOfAgrupations: {type: 'string'}
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
                                    prhase: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            variableId: {type: 'string'},
                                            finalPhrase: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            prhaseRetro: {type: 'boolean'},
                                            dateRetro: {type: 'string'},
                                            dependId: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            specialOrGeneralPhrase: {type: 'boolean'},
                                            orden: {type: 'number'},
                                            nomenclatorToEncodeId: {type: 'string'},
                                            numberOfNomenclatures: {type: 'string'},
                                            numberOfAgrupations: {type: 'string'}
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
            tags: ['AutoPhrases'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'integer'},
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
            tags: ['AutoPhrases'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'integer'},
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
                                    phrase: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            variableId: {type: 'string'},
                                            finalPhrase: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            prhaseRetro: {type: 'boolean'},
                                            dateRetro: {type: 'string'},
                                            dependId: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            specialOrGeneralPhrase: {type: 'boolean'},
                                            orden: {type: 'number'},
                                            nomenclatorToEncodeId: {type: 'string'},
                                            numberOfNomenclatures: {type: 'string'},
                                            numberOfAgrupations: {type: 'string'}
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
    '/api/autoPhrases/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            operationId: 'downloadAutophrasesCSV',
            description: 'Returns autophrases in csv format',
            tags: ['AutoPhrases'],
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
