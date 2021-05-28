module.exports = {
    '/api/relationshipNomenclatures': {
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
                                                nomenclatorId: {type: 'integer'},
                                                nomenclatureId: {type: 'string'},
                                                autophraseId: {type: 'integer'},
                                                observation: {type: 'string'},
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
            tags: ['Auto Phrases'],
            requestBody: {
                description: 'The new autophrase to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: {type: 'integer'},
                                nomenclatureId: {type: 'string'},
                                autophraseId: {type: 'integer'},
                                observation: {type: 'string'},
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
                                    prhase: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: {type: 'integer'},
                                            nomenclatureId: {type: 'string'},
                                            autophraseId: {type: 'integer'},
                                            observation: {type: 'string'},
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
    '/api/relationshipNomenclatures/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Types'],
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
                                nomenclatorId: {type: 'integer'},
                                nomenclatureId: {type: 'string'},
                                autophraseId: {type: 'integer'},
                                observation: {type: 'string'},
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
                                    prhase: {
                                        type: 'object',
                                        properties: {
                                            nomenclatorId: {type: 'integer'},
                                            nomenclatureId: {type: 'string'},
                                            autophraseId: {type: 'integer'},
                                            observation: {type: 'string'},
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
            tags: ['Types'],
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
            tags: ['Types'],
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
                                            nomenclatorId: {type: 'integer'},
                                            nomenclatureId: {type: 'string'},
                                            autophraseId: {type: 'integer'},
                                            observation: {type: 'string'},
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
    }
};
