module.exports = {
    '/api/operativeSources': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operative Sources'],
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
            tags: ['Operative Sources'],
            requestBody: {
                description: 'The new operative source to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'string'},
                                name: {type: 'string'},
                                initial: {type: 'string'},
                                operativeTypeId: {type: 'string'},
                                frequencyId: {type: 'string'},
                                supportId: {type: 'string'},
                                dateFrom: {type: 'string'},
                                dateTo: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                supervised: {type: 'boolean'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
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
                                            name: {type: 'string'},
                                            initial: {type: 'string'},
                                            operativeTypeId: {type: 'string'},
                                            frequencyId: {type: 'string'},
                                            supportId: {type: 'string'},
                                            dateFrom: {type: 'string'},
                                            dateTo: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            supervised: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
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
    '/api/operativeSources/{sourceId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Operative Sources'],
            parameters: [
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Operative Source to update'
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
                                name: {type: 'string'},
                                initial: {type: 'string'},
                                operativeTypeId: {type: 'string'},
                                frequencyId: {type: 'string'},
                                supportId: {type: 'string'},
                                dateFrom: {type: 'string'},
                                dateTo: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                supervised: {type: 'boolean'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
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
                                            name: {type: 'string'},
                                            initial: {type: 'string'},
                                            operativeTypeId: {type: 'string'},
                                            frequencyId: {type: 'string'},
                                            supportId: {type: 'string'},
                                            dateFrom: {type: 'string'},
                                            dateTo: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            supervised: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
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
            tags: ['Operative Sources'],
            parameters: [
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Operative Source to delete'
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
            tags: ['Operative Sources'],
            parameters: [
                {
                    in: 'path',
                    name: 'sourceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'operative source to get'
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
                                            name: {type: 'string'},
                                            initial: {type: 'string'},
                                            operativeTypeId: {type: 'string'},
                                            frequencyId: {type: 'string'},
                                            supportId: {type: 'string'},
                                            dateFrom: {type: 'string'},
                                            dateTo: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            supervised: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
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
    }
};
