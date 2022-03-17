module.exports = {
    '/api/ticket': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Ticket'],
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
                                                originTable: {type: 'string'},
                                                originChatText: {type: 'string'},
                                                createdAt: {type: 'string'},
                                                userCreator: {type: 'string'},
                                                userReponsableId: {type: 'string'},
                                                solutionText: {type: 'string'},
                                                solutionUserId: {type: 'string'},
                                                ticketTypeId: {type: 'integer'},
                                                solutionDate: {type: 'string'},
                                                approved: {type: 'boolean'}
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
            tags: ['Ticket'],
            requestBody: {
                description: 'The new  type of ticket to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                originTable: {type: 'string'},
                                originChatText: {type: 'string'},
                                userReponsableId: {type: 'string'},
                                solutionText: {type: 'string'},
                                solutionUserId: {type: 'string'},
                                ticketTypeId: {type: 'integer'},
                                solutionDate: {type: 'string'},
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
                                            originTable: {type: 'string'},
                                            originChatText: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userReponsableId: {type: 'string'},
                                            solutionText: {type: 'string'},
                                            solutionUserId: {type: 'string'},
                                            ticketTypeId: {type: 'integer'},
                                            solutionDate: {type: 'string'},
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
    '/api/ticket/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Ticket'],
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
                description: 'The new  type of ticket to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
                                originTable: {type: 'string'},
                                originChatText: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                userReponsableId: {type: 'string'},
                                solutionText: {type: 'string'},
                                solutionUserId: {type: 'string'},
                                ticketTypeId: {type: 'integer'},
                                solutionDate: {type: 'string'},
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
                                    ticketType: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'integer'},
                                            originTable: {type: 'string'},
                                            originChatText: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userReponsableId: {type: 'string'},
                                            solutionText: {type: 'string'},
                                            solutionUserId: {type: 'string'},
                                            ticketTypeId: {type: 'integer'},
                                            solutionDate: {type: 'string'},
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
            tags: ['Ticket'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'ticket id deleted'
                }
            ],
            responses: {
                204: {description: 'The resource was deleted successfully.'},
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        get: {
            security: [{bearerAuth: []}],
            tags: ['Ticket'],
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
                                            originTable: {type: 'string'},
                                            originChatText: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userReponsableId: {type: 'string'},
                                            solutionText: {type: 'string'},
                                            solutionUserId: {type: 'string'},
                                            ticketTypeId: {type: 'integer'},
                                            solutionDate: {type: 'string'},
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
    '/api/ticket/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Ticket'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'text/xlsx': {
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
