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
                        type: 'number',
                        default: 1
                    }
                },
                {
                    in: 'query',
                    name: 'source',
                    required: false,
                    schema: {type: 'number'}
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
            tags: ['Source Questions Relations'],
            requestBody: {
                description: 'The new Source Questions Relations to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'number'},
                                questionId: {type: 'number'},
                                questionCode: {type: 'string'},
                                variableId: {type: 'string'},
                                nomenclatorId: {type: 'number'},
                                questionTypeId: {type: 'string'},
                                isRequired: {type: 'boolean'},
                                isCodable: {type: 'boolean'},
                                isAuxiliary: {type: 'boolean'},
                                shouldBeProcessed: {type: 'boolean'},
                                souldHaveAuxiliary: {type: 'boolean'},
                                shouldReadAutoPhrase: {type: 'boolean'},
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
                description: 'The Source Questions Relations to update',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'number'},
                                questionId: {type: 'number'},
                                questionCode: {type: 'string'},
                                variableId: {type: 'string'},
                                nomenclatorId: {
                                    type: 'number',
                                    nullable: true
                                },
                                questionTypeId: {type: 'string'},
                                isRequired: {type: 'boolean'},
                                isCodable: {type: 'boolean'},
                                isAuxiliary: {type: 'boolean'},
                                shouldBeProcessed: {type: 'boolean'},
                                souldHaveAuxiliary: {type: 'boolean'},
                                shouldReadAutoPhrase: {type: 'boolean'},
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
    },
    '/api/sourceQuestionsRelations/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Source Questions Relations'],
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
