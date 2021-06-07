module.exports = {
    '/api/wordCorrectors': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Words Correctors'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'number',
                        default: 1
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
                                    wordsCorrectors: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/WordCorrector'}
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
            tags: ['Words Correctors'],
            requestBody: {
                description: 'The new  word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                corrector: {
                                    type: 'object',
                                    properties: {
                                        wrong: {type: 'string'},
                                        right: {type: 'string'},
                                        isAWord: {type: 'boolean'},
                                        observation: {type: 'string'},
                                        approved: {type: 'boolean'},
                                        frequency: {type: 'integer'}
                                    }
                                }
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
                                properties: {wordCorrector: {$ref: '#/components/schemas/WordCorrector'}}
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
    '/api/wordCorrectors/{wrong}/{right}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Words Correctors'],
            parameters: [
                {
                    in: 'path',
                    name: 'wrong',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'right',
                    required: true,
                    schema: {type: 'string'}
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
                                corrector: {
                                    type: 'object',
                                    properties: {
                                        wrong: {type: 'string'},
                                        right: {type: 'string'},
                                        isAWord: {type: 'boolean'},
                                        observation: {type: 'string'},
                                        approved: {type: 'boolean'},
                                        frequency: {type: 'integer'}
                                    }
                                }
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
                                properties: {wordCorrector: {$ref: '#/components/schemas/WordCorrector'}}
                            }
                        }
                    }
                },
                409: {
                    description: 'Not found words',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    wordsNotFound: {
                                        type: 'array',
                                        items: {type: 'string'}
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
            tags: ['Words Correctors'],
            parameters: [
                {
                    in: 'path',
                    name: 'wrong',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'right',
                    required: true,
                    schema: {type: 'string'}
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
            tags: ['Words Correctors'],
            parameters: [
                {
                    in: 'path',
                    name: 'wrong',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'right',
                    required: true,
                    schema: {type: 'string'}
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {wordCorrector: {$ref: '#/components/schemas/WordCorrector'}}
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
