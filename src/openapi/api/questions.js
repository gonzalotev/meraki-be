module.exports = {
    '/api/questions': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Preguntas'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    questions: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {type: 'string'},
                                                question: {type: 'string'},
                                                approved: {type: 'boolean'},
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
            tags: ['Preguntas'],
            requestBody: {
                description: 'The new  question to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                question: {type: 'string'},
                                approved: {type: 'boolean'},
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
                                    success: {type: 'boolean'},
                                    question: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            question: {type: 'string'},
                                            approved: {type: 'boolean'},
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
    '/api/questions/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Preguntas'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new question to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                question: {type: 'string'},
                                approved: {type: 'boolean'},
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
                                    success: {type: 'boolean'},
                                    question: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            question: {type: 'string'},
                                            approved: {type: 'boolean'},
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
            tags: ['Preguntas'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
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
            tags: ['Preguntas'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
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
                                    question: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            question: {type: 'string'},
                                            approved: {type: 'boolean'},
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
    '/api/quiestions/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            operationId: 'downloadQuestionsCSV',
            description: 'Returns questions in csv format',
            tags: ['Preguntas'],
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
