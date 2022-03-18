module.exports = {
    '/api/operatives': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operatives'],
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
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    operatives: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Operatives'}
                                    },
                                    total: {type: 'number'}
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
            tags: ['Operatives'],
            requestBody: {
                description: 'The new operative source to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'number'},
                                arrivalDate: {type: 'string'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                mailContact: {type: 'string'},
                                operatingContact: {type: 'string'},
                                domain: {type: 'string'}
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
                                    operative: {$ref: '#/components/schemas/Operatives'}
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
    '/api/operatives/{operativeId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Operatives'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
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
                                sourceId: {type: 'number'},
                                arrivalDate: {type: 'string'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                mailContact: {type: 'string'},
                                operatingContact: {type: 'string'},
                                domain: {type: 'string'}
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
                                    operative: {$ref: '#/components/schemas/Operatives'}
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
            tags: ['Operatives'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'number'},
                    description: 'Operative Source to update'
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
            tags: ['Operatives'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'number'},
                    description: 'Operative Source to update'
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
                                    operative: {$ref: '#/components/schemas/Operatives'}
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
    '/api/operatives/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operatives'],
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
