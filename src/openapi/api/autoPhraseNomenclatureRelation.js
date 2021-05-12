module.exports = {
    '/api/autoPhraseNomenclatureRelation': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Auto Phrases - Nomenclatures'],
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
                                        items: {$ref: '#/components/schemas/AutoPhraseNomenclatureRelation'}
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
            tags: ['Auto Phrases - Nomenclatures'],
            requestBody: {
                description: 'The new auto phrase and nomenclature relation to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: {type: 'number'},
                                nomenclatureId: {type: 'string'},
                                autoPhraseId: {type: 'number'},
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
                                properties: {relation: {$ref: '#/components/schemas/AutoPhraseNomenclatureRelation'}}
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
    '/api/autoPhraseNomenclatureRelation/{nomenclatorId}/{nomenclatureId}/{autoPhraseId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Auto Phrases - Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'autoPhraseId',
                    required: true,
                    schema: {type: 'number'}
                }
            ],
            requestBody: {
                description: 'Auto phrase and nomenclature relation to update',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                nomenclatorId: {type: 'number'},
                                nomenclatureId: {type: 'string'},
                                autoPhraseId: {type: 'number'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
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
                                properties: {relation: {$ref: '#/components/schemas/AutoPhraseNomenclatureRelation'}}
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
            tags: ['Auto Phrases - Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'autoPhraseId',
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
                                properties: {relation: {$ref: '#/components/schemas/AutoPhraseNomenclatureRelation'}}
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
            tags: ['Auto Phrases - Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'nomenclatorId',
                    required: true,
                    schema: {type: 'number'}
                },
                {
                    in: 'path',
                    name: 'nomenclatureId',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'autoPhraseId',
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
