module.exports = {
    '/api/microprocessesStepsOption': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Steps Option'],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    microprocessesStepsOption: {
                                        type: 'array',
                                        items: {}
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
            tags: ['Microprocesses Steps Option'],
            requestBody: {
                description: 'The new step Linguistic process to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                microprocessId: {type: 'string'},
                                orderId: {type: 'string'},
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                order: {type: 'string'},
                                abbreviation: {type: 'string'},
                                observation: {type: 'string'},
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
                                    success: {type: 'boolean'},
                                    stepLinguisticProcess: {
                                        type: 'object',
                                        properties: {
                                            microprocessId: {type: 'string'},
                                            orderId: {type: 'string'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            order: {type: 'string'},
                                            abbreviation: {type: 'string'},
                                            observation: {type: 'string'},
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
    '/api/microprocessesStepsOption/{microprocessId}/{orderId}/{sourceId}/{questionId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Steps Option'],
            parameters: [
                {
                    in: 'path',
                    name: 'microprocessId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'microprocessId to update'
                },
                {
                    in: 'path',
                    name: 'orderId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'orderId to update'
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'sourceId to update'
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'questionId to update'
                }
            ],
            requestBody: {
                description: 'Changes to save',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                microprocessId: {type: 'string'},
                                orderId: {type: 'string'},
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                order: {type: 'string'},
                                abbreviation: {type: 'string'},
                                observation: {type: 'string'},
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
                                    success: {type: 'boolean'},
                                    stepLinguisticProcess: {
                                        type: 'object',
                                        properties: {
                                            microprocessId: {type: 'string'},
                                            orderId: {type: 'string'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            order: {type: 'string'},
                                            abbreviation: {type: 'string'},
                                            observation: {type: 'string'},
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
            tags: ['Microprocesses Steps Option'],
            parameters: [
                {
                    in: 'path',
                    name: 'microprocessId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'microprocessId to delete'
                },
                {
                    in: 'path',
                    name: 'orderId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'orderId to delete'
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'sourceId to delete'
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'questionId to delete'
                }
            ],
            responses: {
                204: {
                    description: 'The resource was deleted successfully',
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
            tags: ['Microprocesses Steps Option'],
            parameters: [
                {
                    in: 'path',
                    name: 'microprocessId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'microprocessId to get'
                },
                {
                    in: 'path',
                    name: 'orderId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'orderId to get'
                },
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'sourceId to get'
                },
                {
                    in: 'path',
                    name: 'questionId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'questionId to get'
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
                                    stepLinguisticProcess: {
                                        type: 'object',
                                        properties: {
                                            microprocessId: {type: 'string'},
                                            orderId: {type: 'string'},
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            order: {type: 'string'},
                                            abbreviation: {type: 'string'},
                                            observation: {type: 'string'},
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
    '/api/microprocessesStepsOption/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses Steps Option'],
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
