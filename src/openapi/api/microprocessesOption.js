module.exports = {
    '/api/microprocessesOption': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Option'],
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
                                                id: {type: 'string'},
                                                sourceId: {type: 'number'},
                                                questionId: {type: 'number'},
                                                orden: {type: 'number'},
                                                observation: {type: 'string'},
                                                abbreviature: {type: 'string'},
                                                userCreator: {type: 'string'},
                                                createdAt: {type: 'string'}
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
            tags: ['Microprocesses Option'],
            requestBody: {
                description: 'The new  List of Microprocesses If to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                sourceId: {type: 'number'},
                                questionId: {type: 'number'},
                                orden: {type: 'number'},
                                observation: {type: 'string'},
                                abbreviature: {type: 'string'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'}
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
                                            id: {type: 'string'},
                                            sourceId: {type: 'number'},
                                            questionId: {type: 'number'},
                                            orden: {type: 'number'},
                                            observation: {type: 'string'},
                                            abbreviature: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'}
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
    '/api/microprocessesOption/{id}/{sourceId}/{questionId}/{orden}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Option'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'orden',
                    required: true,
                    schema: {type: 'number'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new type of Microprocesses Option to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                sourceId: {type: 'number'},
                                questionId: {type: 'number'},
                                orden: {type: 'number'},
                                observation: {type: 'string'},
                                abbreviature: {type: 'string'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'}
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
                                            id: {type: 'string'},
                                            sourceId: {type: 'number'},
                                            questionId: {type: 'number'},
                                            orden: {type: 'number'},
                                            observation: {type: 'string'},
                                            abbreviature: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'}
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
            tags: ['Microprocesses Option'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'orden',
                    required: true,
                    schema: {type: 'number'},
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
                                            id: {type: 'string'},
                                            sourceId: {type: 'number'},
                                            questionId: {type: 'number'},
                                            orden: {type: 'number'},
                                            observation: {type: 'string'},
                                            abbreviature: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'}
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
            tags: ['Microprocess Option'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'orden',
                    required: true,
                    schema: {type: 'number'},
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
    '/api/microprocessesOption/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Option'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
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
