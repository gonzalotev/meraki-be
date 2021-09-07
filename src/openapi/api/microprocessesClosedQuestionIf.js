module.exports = {
    '/api/microprocessesClosedQuestionIf': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Closed Questions'],
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
                                    tickets: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {type: 'integer'},
                                                sourceId: {type: 'string'},
                                                questionId: {type: 'string'},
                                                description: {type: 'string'},
                                                observation: {type: 'string'},
                                                domain: {type: 'string'},
                                                operatorId: {type: 'string'},
                                                signPlsql: {type: 'string'},
                                                nomenclatorId: {type: 'string'},
                                                nomenclatureId: {type: 'string'},
                                                approved: {type: 'boolean'},
                                                createdAt: {type: 'string'},
                                                signJs: {type: 'string'}
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
            tags: ['Microprocesses Closed Questions'],
            requestBody: {
                description: 'The new List of Microprocesses Closed Questions to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                operatorId: {type: 'string'},
                                signPlsql: {type: 'string'},
                                nomenclatorId: {type: 'string'},
                                nomenclatureId: {type: 'string'},
                                approved: {type: 'boolean'},
                                createdAt: {type: 'string'},
                                signJs: {type: 'string'}
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
                                    ticketType: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'integer'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            operatorId: {type: 'string'},
                                            signPlsql: {type: 'string'},
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            signJs: {type: 'string'}
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
    '/api/microprocessesClosedQuestionIf/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Closed Questions'],
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
                description: 'The new type of Microprocesses List If to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                operatorId: {type: 'string'},
                                signPlsql: {type: 'string'},
                                nomenclatorId: {type: 'string'},
                                nomenclatureId: {type: 'string'},
                                approved: {type: 'boolean'},
                                createdAt: {type: 'string'},
                                signJs: {type: 'string'}
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
                                    ticketType: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'integer'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            operatorId: {type: 'string'},
                                            signPlsql: {type: 'string'},
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            signJs: {type: 'string'}
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
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Closed Questions'],
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
                                    ticketType: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'integer'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            operatorId: {type: 'string'},
                                            signPlsql: {type: 'string'},
                                            nomenclatorId: {type: 'string'},
                                            nomenclatureId: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            signJs: {type: 'string'}
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
            tags: ['Microprocesses Closed Questions'],
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
                204: {description: 'The resource was deleted successfully.'},
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }

    },
    '/api/microprocessesClosedQuestionIf/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Closed Questions'],
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
