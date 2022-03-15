module.exports = {
    '/api/relationshipQuestionClosedsNomenclatures': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Relationship QuestionCloseds Nomenclatures'],
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
                                                closedQuestionId: {type: 'integer'},
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
            tags: ['Relationship QuestionCloseds Nomenclatures'],
            requestBody: {
                description: 'The new  type of relationship to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                closedQuestionId: {type: 'integer'},
                                nomenclatorId: {type: 'integer'},
                                nomenclatureId: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                approved: {type: 'boolean'}
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
                                            closedQuestionId: {type: 'integer'},
                                            nomenclatorId: {type: 'integer'},
                                            nomenclatureId: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            approved: {type: 'boolean'}
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
    '/api/relationshipQuestionClosedsNomenclatures/{closedQuestionId}/{nomenclatorId}/{nomenclatureId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Relationship QuestionCloseds Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'closedQuestionId',
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
                                closedQuestionId: {type: 'integer'},
                                nomenclatorId: {type: 'integer'},
                                nomenclatureId: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                approved: {type: 'boolean'}
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
                                            closedQuestionId: {type: 'integer'},
                                            nomenclatorId: {type: 'integer'},
                                            nomenclatureId: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            approved: {type: 'boolean'}
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
                    name: 'closedQuestionId',
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
            tags: ['Relationship QuestionCloseds Nomenclatures'],
            parameters: [
                {
                    in: 'path',
                    name: 'closedQuestionId',
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
                                            closedQuestionId: {type: 'integer'},
                                            nomenclatorId: {type: 'integer'},
                                            nomenclatureId: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            approved: {type: 'boolean'}
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
    '/api/relationshipQuestionClosedsNomenclatures/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Relationship QuestionCloseds Nomenclatures'],
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
