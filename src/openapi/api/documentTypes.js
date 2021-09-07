module.exports = {
    '/api/documentTypes': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Document Types'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    documents: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {type: 'string'},
                                                description: {type: 'string'},
                                                observation: {type: 'string'},
                                                domain: {type: 'string'},
                                                approved: {type: 'boolean'},
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
            tags: ['Document Types'],
            requestBody: {
                description: 'The new  type of document to create',
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
                                    documentType: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
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
    '/api/documentTypes/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Document Types'],
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
                description: 'The new  type of document to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                approved: {type: 'boolean'},
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
                                    documentType: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
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
            tags: ['Document Types'],
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
                204: {description: 'The resource was deleted successfully.'},
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        get: {
            security: [{bearerAuth: []}],
            tags: ['Document Types'],
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
                                    documentType: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            approved: {type: 'boolean'},
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
    '/api/documentTypes/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Document Types'],
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
