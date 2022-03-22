module.exports = {
    '/api/sourceQuestionsRelations': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Source Questions Relations'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 1
                    }
                },
                {
                    in: 'query',
                    name: 'source',
                    required: false,
                    schema: {type: 'integer'}
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
                                    sourceQuestionsRelations: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/SourceQuestionRelation'}
                                    },
                                    total: {type: 'integer'}
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
            tags: ['Source Questions Relations'],
            requestBody: {
                description: 'The new Source Questions Relations to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'integer'},
                                questionId: {type: 'integer'},
                                questionCode: {type: 'string'},
                                variableId: {type: 'string'},
                                nomenclatorId: {type: 'integer'},
                                questionTypeId: {type: 'string'},
                                isCodable: {type: 'boolean'},
                                shouldBeProcessed: {type: 'boolean'},
                                observation: {type: 'string'},
                                domain: {type: 'string'}
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
                                properties: {sourceQuestionRelation: {$ref: '#/components/schemas/SourceQuestionRelation'}}
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
    '/api/sourceQuestionsRelations/{sourceId}/{questionId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Source Questions Relations'],
            parameters: [
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'integer'}
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'integer'}
                }
            ],
            requestBody: {
                description: 'The Source Questions Relations to update',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'integer'},
                                questionId: {type: 'integer'},
                                questionCode: {type: 'string'},
                                variableId: {type: 'string'},
                                nomenclatorId: {
                                    type: 'integer',
                                    nullable: true
                                },
                                questionTypeId: {type: 'string'},
                                isCodable: {type: 'boolean'},
                                shouldBeProcessed: {type: 'boolean'},
                                observation: {type: 'string'},
                                domain: {type: 'string'}
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
                                properties: {sourceQuestionRelation: {$ref: '#/components/schemas/SourceQuestionRelation'}}
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
            tags: ['Source Questions Relations'],
            parameters: [
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'integer'}
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'integer'}
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {sourceQuestionRelation: {$ref: '#/components/schemas/SourceQuestionRelation'}}
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
            tags: ['Source Questions Relations'],
            parameters: [
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'integer'}
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'integer'}
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
    '/api/sourceQuestionsRelations/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Source Questions Relations'],
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
    },
    '/api/sourceQuestionsRelations/options': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Source Questions Relations'],
            parameters: [
                {
                    in: 'query',
                    name: 'sources',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'sourceId',
                    required: false,
                    schema: {type: 'number'}
                },
                {
                    in: 'query',
                    name: 'questions',
                    required: false,
                    schema: {type: 'boolean'}
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
                                    sources: {type: 'array'},
                                    questions: {type: 'array'}
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
