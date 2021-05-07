module.exports = {
    '/api/newWords': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['News Words'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    words: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id_operative: {type: 'integer'},
                                                id_variable: {type: 'string'},
                                                news_words: {type: 'string'},
                                                frequence: {type: 'integer'},
                                                abc: {type: 'string'},
                                                corrected: {type: 'boolean'},
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
            tags: ['News Words'],
            requestBody: {
                description: 'The new  word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id_operative: {type: 'integer'},
                                id_variable: {type: 'string'},
                                news_words: {type: 'string'},
                                frequence: {type: 'integer'},
                                abc: {type: 'string'},
                                corrected: {type: 'boolean'}
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
                                    newWord: {
                                        type: 'object',
                                        properties: {
                                            id_operative: {type: 'integer'},
                                            id_variable: {type: 'string'},
                                            news_words: {type: 'string'},
                                            frequence: {type: 'integer'},
                                            abc: {type: 'string'},
                                            corrected: {type: 'boolean'},
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
    '/api/newWords/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['News Words'],
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
                description: 'The new word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
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
                                    newWord: {
                                        type: 'object',
                                        properties: {
                                            id_operative: {type: 'integer'},
                                            id_variable: {type: 'string'},
                                            news_words: {type: 'string'},
                                            frequence: {type: 'integer'},
                                            abc: {type: 'string'},
                                            corrected: {type: 'boolean'},
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
        delete: {
            security: [{bearerAuth: []}],
            tags: ['News Words'],
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
                204: {description: 'The resource was deleted successfully.'},
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        get: {
            security: [{bearerAuth: []}],
            tags: ['News Words'],
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
                                    newWord: {
                                        type: 'object',
                                        properties: {
                                            id_operative: {type: 'integer'},
                                            id_variable: {type: 'string'},
                                            news_words: {type: 'string'},
                                            frequence: {type: 'integer'},
                                            abc: {type: 'string'},
                                            corrected: {type: 'boolean'},
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
    }
};
