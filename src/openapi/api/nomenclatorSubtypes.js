module.exports = {
    '/api/nomenclatorSubtypes': {
        get: {
            security: [{bearerAuth: []}],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
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
            requestBody: {
                description: 'The new  type of net to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                typeId: {type: 'string'},
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
                                    success: {type: 'boolean'},
                                    nomenclator: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            typeId: {type: 'string'},
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
    '/api/nomenclatorSubtypes/{id}/{typeId}': {
        put: {
            security: [{bearerAuth: []}],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Nomenclator subtype id to update'
                },
                {
                    in: 'path',
                    name: 'typeId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Nomenclator type id to update'
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
                                id: {type: 'string'},
                                typeId: {type: 'string'},
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
                                    success: {type: 'boolean'},
                                    nomenclator: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            typeId: {type: 'string'},
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
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Nomenclator subtype id to update'
                },
                {
                    in: 'path',
                    name: 'typeId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Nomenclator type id to update'
                }
            ],
            responses: {
                200: {
                    description: 'ok',
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
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Nomenclator subtype id to update'
                },
                {
                    in: 'path',
                    name: 'typeId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Nomenclator type id to update'
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
                                    nomenclator: {
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
    }
};
