module.exports = {
    '/api/dictionaryTypes': {
        get: {
            tags: ['Types'],
            security: [{bearerAuth: []}],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    dictionaries: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {type: 'string'},
                                                description: {type: 'string'},
                                                isOriginAWord: {type: 'boolean'},
                                                haveDesnityDescription: {type: 'boolean'},
                                                isDestinyAWord: {type: 'boolean'},
                                                haveRegex: {type: 'boolean'},
                                                validation: {type: 'string'},
                                                approved: {type: 'boolean'},
                                                domain: {type: 'string'},
                                                observation: {type: 'string'},
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
            tags: ['Types'],
            requestBody: {
                description: 'The new  type of dictionary to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                description: {type: 'string'},
                                isOriginAWord: {type: 'boolean'},
                                haveDesnityDescription: {type: 'boolean'},
                                isDestinyAWord: {type: 'boolean'},
                                haveRegex: {type: 'boolean'},
                                validation: {type: 'string'},
                                approved: {type: 'boolean'},
                                domain: {type: 'string'},
                                observation: {type: 'string'},
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
                                    dictionary: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            description: {type: 'string'},
                                            isOriginAWord: {type: 'boolean'},
                                            haveDesnityDescription: {type: 'boolean'},
                                            isDestinyAWord: {type: 'boolean'},
                                            haveRegex: {type: 'boolean'},
                                            validation: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
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
    '/api/dictionaryTypes/{id}': {
        put: {
            security: [{ bearerAuth: []}],
            tags: ['Types'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Dictionary type id to update'
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
                                description: {type: 'string'},
                                isOriginAWord: {type: 'boolean'},
                                haveDesnityDescription: {type: 'boolean'},
                                isDestinyAWord: {type: 'boolean'},
                                haveRegex: {type: 'boolean'},
                                validation: {type: 'string'},
                                approved: {type: 'boolean'},
                                domain: {type: 'string'},
                                observation: {type: 'string'},
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
                                    dictionary: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            description: {type: 'string'},
                                            isOriginAWord: {type: 'boolean'},
                                            haveDesnityDescription: {type: 'boolean'},
                                            isDestinyAWord: {type: 'boolean'},
                                            haveRegex: {type: 'boolean'},
                                            validation: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
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
            tags: ['Types'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Dictionary type id to delete'
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
            tags: ['Types'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Dictionary type id to get'
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
                                    dictionary: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            description: {type: 'string'},
                                            isOriginAWord: {type: 'boolean'},
                                            haveDesnityDescription: {type: 'boolean'},
                                            isDestinyAWord: {type: 'boolean'},
                                            haveRegex: {type: 'boolean'},
                                            validation: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
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
