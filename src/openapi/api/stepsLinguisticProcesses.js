module.exports = {
    '/api/stepsEncodingProcesses': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Steps Encoding Processes'],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    opertiveSources: {
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
            tags: ['Steps Encoding Processes'],
            requestBody: {
                description: 'The new step encoding process to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                order: {type: 'string'},
                                encodingProcessId: {type: 'string'},
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
                201: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    operativeSource: {
                                        type: 'object',
                                        properties: {
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            order: {type: 'string'},
                                            encodingProcessId: {type: 'string'},
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
    '/api/stepsEncodingProcesses/{sourceId}/{questionId}/{order}/{encodingProcessId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Steps Encoding Processes'],
            parameters: [
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
                },
                {
                    in: 'path',
                    name: 'order',
                    required: true,
                    schema: {type: 'string'},
                    description: 'questionId to update'
                },
                {
                    in: 'path',
                    name: 'encodingProcessId',
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
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                order: {type: 'string'},
                                encodingProcessId: {type: 'string'},
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
                                    operativeSource: {
                                        type: 'object',
                                        properties: {
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            order: {type: 'string'},
                                            encodingProcessId: {type: 'string'},
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
            tags: ['Steps Encoding Processes'],
            parameters: [
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
                },
                {
                    in: 'path',
                    name: 'order',
                    required: true,
                    schema: {type: 'string'},
                    description: 'questionId to update'
                },
                {
                    in: 'path',
                    name: 'encodingProcessId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'questionId to update'
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
            tags: ['Steps Encoding Processes'],
            parameters: [
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
                },
                {
                    in: 'path',
                    name: 'order',
                    required: true,
                    schema: {type: 'string'},
                    description: 'questionId to update'
                },
                {
                    in: 'path',
                    name: 'encodingProcessId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'questionId to update'
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
                                    word: {
                                        type: 'object',
                                        properties: {
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            order: {type: 'string'},
                                            encodingProcessId: {type: 'string'},
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
    '/api/stepsEncodingProcesses/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Steps Encoding Processes'],
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
                                        items: {$ref: '#/components/schemas/StepsEncodingProcesses'}
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
