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
                                    operativesSources: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/OperativeSources'}
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
                                name: {type: 'string'},
                                initial: {type: 'string'},
                                operativeTypeId: {type: 'number'},
                                frequencyId: {type: 'number'},
                                supportId: {type: 'number'},
                                dateFrom: {type: 'string'},
                                dateTo: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                supervised: {type: 'boolean'}
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
                                    operativeSource: {$ref: '#/components/schemas/OperativeSources'}
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
                    schema: {type: 'number'},
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
                                name: {type: 'string'},
                                initial: {type: 'string'},
                                operativeTypeId: {type: 'number'},
                                frequencyId: {type: 'number'},
                                supportId: {type: 'number'},
                                dateFrom: {type: 'string'},
                                dateTo: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                supervised: {type: 'boolean'}
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
                                    operativeSource: {$ref: '#/components/schemas/OperativeSources'}
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
                    schema: {type: 'number'},
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
                    schema: {type: 'number'},
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
                                    operativeSource: {$ref: '#/components/schemas/OperativeSources'}
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
    '/api/operativeSources/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operative Sources'],
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
