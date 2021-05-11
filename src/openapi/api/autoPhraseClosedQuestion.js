module.exports = {
    '/api/autoPhraseClosedQuestion': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Auto Phrases - Closed Questions'],
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
                                    relations: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/AutoPhraseClosedQuestion'}
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
            tags: ['Auto Phrases - Closed Questions'],
            requestBody: {
                description: 'The new auto phrase and question relation to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                autoPhraseId: {type: 'number'},
                                sourceId: {type: 'number'},
                                questionId: {type: 'number'},
                                abbreviation: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                nomenclatorId: {type: 'number'},
                                nomenclatureId: {type: 'string'},
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
                                properties: {relation: {$ref: '#/components/schemas/AutoPhraseClosedQuestion'}}
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
    '/api/autoPhraseClosedQuestion/{autoPhraseId}/{sourceId}/{questionId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Auto Phrases - Closed Questions'],
            parameters: [
                {
                    in: 'path',
                    name: 'autoPhraseId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'number'}
                }
            ],
            requestBody: {
                description: 'Auto phrase and question relation to update',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                autoPhraseId: {type: 'number'},
                                sourceId: {type: 'number'},
                                questionId: {type: 'number'},
                                abbreviation: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                nomenclatorId: {type: 'number'},
                                nomenclatureId: {type: 'string'},
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
                                properties: {relation: {$ref: '#/components/schemas/AutoPhraseClosedQuestion'}}
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
            tags: ['Auto Phrases - Closed Questions'],
            parameters: [
                {
                    in: 'path',
                    name: 'autoPhraseId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'questionId',
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
                                properties: {autoPhrase: {$ref: '#/components/schemas/AutoPhraseClosedQuestion'}}
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
            tags: ['Auto Phrases - Closed Questions'],
            parameters: [
                {
                    in: 'path',
                    name: 'autoPhraseId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'questionId',
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
    }
};
