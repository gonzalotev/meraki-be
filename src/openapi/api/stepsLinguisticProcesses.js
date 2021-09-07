module.exports = {
    '/api/stepsLinguisticProcesses': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Steps Linguistic Processes'],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    stepsLinguisticProcesses: {
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
            tags: ['Steps Linguistic Processes'],
            requestBody: {
                description: 'The new step Linguistic process to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'string'},
                                questionId: {type: 'string'},
                                dictionaryTypologyId: {type: 'string'},
                                order: {type: 'string'},
                                linguisticFieldNameId: {type: 'string'},
                                showOnScreen: {type: 'boolean'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
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
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            dictionaryTypologyId: {type: 'string'},
                                            order: {type: 'string'},
                                            linguisticFieldNameId: {type: 'string'},
                                            showOnScreen: {type: 'boolean'},
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
    '/api/stepsLinguisticProcesses/{sourceId}/{questionId}/{dictionaryTypologyId}/{order}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Steps Linguistic Processes'],
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
                    name: 'dictionaryTypologyId',
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
                                dictionaryTypologyId: {type: 'string'},
                                order: {type: 'string'},
                                linguisticFieldNameId: {type: 'string'},
                                showOnScreen: {type: 'boolean'},
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
                                    stepLinguisticProcess: {
                                        type: 'object',
                                        properties: {
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            dictionaryTypologyId: {type: 'string'},
                                            order: {type: 'string'},
                                            linguisticFieldNameId: {type: 'string'},
                                            showOnScreen: {type: 'boolean'},
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
            tags: ['Steps Linguistic Processes'],
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
                    name: 'dictionaryTypologyId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'dictionaryTypologyId to update'
                },
                {
                    in: 'path',
                    name: 'order',
                    required: true,
                    schema: {type: 'string'},
                    description: 'order to update'
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
            tags: ['Steps Linguistic Processes'],
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
                    name: 'dictionaryTypologyId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'dictionaryTypologyId to update'
                },
                {
                    in: 'path',
                    name: 'order',
                    required: true,
                    schema: {type: 'string'},
                    description: 'order to update'
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
                                            sourceId: {type: 'string'},
                                            questionId: {type: 'string'},
                                            dictionaryTypologyId: {type: 'string'},
                                            order: {type: 'string'},
                                            linguisticFieldNameId: {type: 'string'},
                                            showOnScreen: {type: 'boolean'},
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
    '/api/stepsLinguisticProcesses/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Steps Linguistic Processes'],
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
