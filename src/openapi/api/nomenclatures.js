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
                                    nomenclatures: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                nomenclatorId: {type: 'number'},
                                                nomenclatureId: {type: 'string'},
                                                abreviation: {type: 'string'},
                                                original: {type: 'string'},
                                                description: {type: 'string'},
                                                fractionationOfWords: {type: 'boolean'},
                                                approved: {type: 'boolean'},
                                                coefficient: {type: 'boolean'},
                                                fatherNomenclatorId: {type: 'number'},
                                                fatherNomenclatureId: {type: 'string'},
                                                acronim: {type: 'string'},
                                                observation: {type: 'string'},
                                                domain: {type: 'string'},
                                                userCreator: {type: 'string'},
                                                createdAt: {type: 'string'},
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
                description: 'The new  nomenclature to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: {type: 'number'},
                                nomenclatureId: {type: 'string'},
                                abreviation: {type: 'string'},
                                original: {type: 'string'},
                                description: {type: 'string'},
                                fractionationOfWords: {type: 'boolean'},
                                approved: {type: 'boolean'},
                                coefficient: {type: 'boolean'},
                                fatherNomenclatorId: {type: 'number'},
                                fatherNomenclatureId: {type: 'string'},
                                acronim: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'},
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
                                    nomenclature: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: {type: 'number'},
                                            nomenclatureId: {type: 'string'},
                                            abreviation: {type: 'string'},
                                            original: {type: 'string'},
                                            description: {type: 'string'},
                                            fractionationOfWords: {type: 'boolean'},
                                            approved: {type: 'boolean'},
                                            coefficient: {type: 'boolean'},
                                            fatherNomenclatorId: {type: 'number'},
                                            fatherNomenclatureId: {type: 'string'},
                                            acronim: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
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
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new nomenclature to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: {type: 'number'},
                                nomenclatureId: {type: 'string'},
                                abreviation: {type: 'string'},
                                original: {type: 'string'},
                                description: {type: 'string'},
                                fractionationOfWords: {type: 'boolean'},
                                approved: {type: 'boolean'},
                                coefficient: {type: 'boolean'},
                                fatherNomenclatorId: {type: 'number'},
                                fatherNomenclatureId: {type: 'string'},
                                acronim: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'},
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
                                    nomenclature: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: {type: 'number'},
                                            nomenclatureId: {type: 'string'},
                                            abreviation: {type: 'string'},
                                            original: {type: 'string'},
                                            description: {type: 'string'},
                                            fractionationOfWords: {type: 'boolean'},
                                            approved: {type: 'boolean'},
                                            coefficient: {type: 'boolean'},
                                            fatherNomenclatorId: {type: 'number'},
                                            fatherNomenclatureId: {type: 'string'},
                                            acronim: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
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
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                }
            ],
            responses: {
                204: {description: 'The resource was deleted successfully.'},
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
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
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
                                    nomenclature: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: {type: 'number'},
                                            nomenclatureId: {type: 'string'},
                                            abreviation: {type: 'string'},
                                            original: {type: 'string'},
                                            description: {type: 'string'},
                                            fractionationOfWords: {type: 'boolean'},
                                            approved: {type: 'boolean'},
                                            coefficient: {type: 'boolean'},
                                            fatherNomenclatorId: {type: 'number'},
                                            fatherNomenclatureId: {type: 'string'},
                                            acronim: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
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
            operationId: 'downloadNomenclaturesCSV',
            description: 'Returns nomenclatures in csv format',
            tags: ['Nomenclatures'],
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
