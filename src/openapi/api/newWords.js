module.exports = {
    '/api/newWords': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Types'],
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
                                                frequencies: {type: 'integer'},
                                                abc: {type: 'string'},
                                                corrected: {type: 'boolean'},
                                                high_date_word: {type: 'string'}
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
                                frequencies: {type: 'integer'},
                                abc: {type: 'string'},
                                corrected: {type: 'boolean'},
                                high_date_word: {type: 'string'}
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
                                            frequencies: {type: 'integer'},
                                            abc: {type: 'string'},
                                            corrected: {type: 'boolean'},
                                            high_date_word: {type: 'string'}
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
            tags: ['Types'],
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
                                frequencies: {type: 'integer'},
                                abc: {type: 'string'},
                                corrected: {type: 'boolean'},
                                high_date_word: {type: 'string'}
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
                                            frequencies: {type: 'integer'},
                                            abc: {type: 'string'},
                                            corrected: {type: 'boolean'},
                                            high_date_word: {type: 'string'}
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
            tags: ['Types'],
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
                                            frequencies: {type: 'integer'},
                                            abc: {type: 'string'},
                                            corrected: {type: 'boolean'},
                                            high_date_word: {type: 'string'}
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
