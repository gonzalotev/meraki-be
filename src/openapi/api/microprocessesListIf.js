module.exports = {
    '/api/microprocessesListIf': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses List If'],
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
                                                variableId: {type: 'string'},
                                                description: {type: 'string'},
                                                diccionaryTypologyId: {type: 'string'},
                                                observation: {type: 'string'},
                                                domain: {type: 'string'},
                                                approved: {type: 'boolean'},
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
            tags: ['Microprocesses List If'],
            requestBody: {
                description: 'The new  List of Microprocesses If to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
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
                                    ticketType: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            description: {type: 'string'},
                                            diccionaryTypologyId: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
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
    '/api/microprocessesListIf/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses List If'],
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
                                variableId: {type: 'string'},
                                description: {type: 'string'},
                                diccionaryTypologyId: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                approved: {type: 'boolean'},
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
                                            id: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            description: {type: 'string'},
                                            diccionaryTypologyId: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
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
            tags: ['Microprocesses List If'],
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
                                            variableId: {type: 'string'},
                                            description: {type: 'string'},
                                            diccionaryTypologyId: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
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
    '/api/microprocessesListIf/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocesses List If'],
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
