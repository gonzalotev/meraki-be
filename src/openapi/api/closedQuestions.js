module.exports = {
    '/api/closedQuestions': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Closed Questions'],
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
                                                closedQuestionId: {type: 'string'},
                                                sourceId: {type: 'string'},
                                                questionId: {type: 'string'},
                                                description: {type: 'string'},
                                                observation: {type: 'string'},
                                                domain: {type: 'string'},
                                                operatorId: {type: 'string'},
                                                plsqlSymbol: {type: 'string'},
                                                jsSymbol: {type: 'string'},
                                                nomenclatorId: {type: 'string'},
                                                nomenclatureId: {type: 'string'},
                                                approved: {type: 'boolean'},
                                                userCreator: {type: 'string'},
                                                createdAt: {type: 'string'},
                                                nomenclatorEncodeId: {type: 'string'},
                                                nomenclatorAmount: {type: 'boolean'},
                                                groupingsAmount: {type: 'boolean'}
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
            tags: ['Closed Questions'],
            requestBody: {
                description: 'The new closedQuestion to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                closedQuestionId: {type: 'string'},
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                operatorId: {type: 'string'},
                                plsqlSymbol: {type: 'string'},
                                jsSymbol: {type: 'string'},
                                nomenclatorId: {type: 'string'},
                                nomenclatureId: {type: 'string'},
                                approved: {type: 'boolean'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'},
                                nomenclatorEncodeId: {type: 'string'},
                                nomenclatorAmount: {type: 'boolean'},
                                groupingsAmount: {type: 'boolean'}
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
                                            closedQuestionId: {type: 'string'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            operatorId: {type: 'string'},
                                            plsqlSymbol: {type: 'string'},
                                            jsSymbol: {type: 'string'},
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            nomenclatorEncodeId: {type: 'string'},
                                            nomenclatorAmount: {type: 'boolean'},
                                            groupingsAmount: {type: 'boolean'}
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
    '/api/closedQuestions/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['ClosedQuestions'],
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
                description: 'The new closedQuestion to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                closedQuestionId: {type: 'string'},
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                operatorId: {type: 'string'},
                                plsqlSymbol: {type: 'string'},
                                jsSymbol: {type: 'string'},
                                nomenclatorId: {type: 'string'},
                                nomenclatureId: {type: 'string'},
                                approved: {type: 'boolean'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'},
                                nomenclatorEncodeId: {type: 'string'},
                                nomenclatorAmount: {type: 'boolean'},
                                groupingsAmount: {type: 'boolean'}
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
                                            closedQuestionId: {type: 'string'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            operatorId: {type: 'string'},
                                            plsqlSymbol: {type: 'string'},
                                            jsSymbol: {type: 'string'},
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            nomenclatorEncodeId: {type: 'string'},
                                            nomenclatorAmount: {type: 'boolean'},
                                            groupingsAmount: {type: 'boolean'}
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
            tags: ['ClosedQuestions'],
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
            tags: ['ClosedQuestions'],
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
                                    question: {
                                        type: 'object',
                                        properties: {
                                            closedQuestionId: {type: 'string'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            operatorId: {type: 'string'},
                                            plsqlSymbol: {type: 'string'},
                                            jsSymbol: {type: 'string'},
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            nomenclatorEncodeId: {type: 'string'},
                                            nomenclatorAmount: {type: 'boolean'},
                                            groupingsAmount: {type: 'boolean'}
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
    '/api/closedQuestions/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            operationId: 'downloadClosedQuestionsCSV',
            description: 'Returns closedQuestions in csv format',
            tags: ['ClosedQuestions'],
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
