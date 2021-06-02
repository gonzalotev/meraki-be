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
                                    words: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                incorrect: {type: 'string'},
                                                correct: {type: 'string'},
                                                destination_word: {type: 'boolean'},
                                                observation: {type: 'string'},
                                                approved: {type: 'boolean'},
                                                frequence: {type: 'integer'},
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
            tags: ['Words Correctors'],
            requestBody: {
                description: 'The new  word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                incorrect: {type: 'string'},
                                correct: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'}
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
                                    wordCorrector: {
                                        type: 'object',
                                        properties: {
                                            incorrect: {type: 'string'},
                                            correct: {type: 'string'},
                                            destination_word: {type: 'boolean'},
                                            observation: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            frequence: {type: 'integer'},
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
    '/api/wordCorrectors/{incorrect}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Words Correctors'],
            parameters: [
                {
                    in: 'path',
                    name: 'incorrect',
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
                                incorrect: {type: 'string'},
                                correct: {type: 'string'},
                                destination_word: {type: 'boolean'},
                                observation: {type: 'string'},
                                approved: {type: 'boolean'},
                                frequence: {type: 'integer'},
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
                                    wordCorrector: {
                                        type: 'object',
                                        properties: {
                                            incorrect: {type: 'string'},
                                            correct: {type: 'string'},
                                            destination_word: {type: 'boolean'},
                                            observation: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            frequence: {type: 'integer'},
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
            tags: ['Words Correctors'],
            parameters: [
                {
                    in: 'path',
                    name: 'incorrect',
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
            tags: ['Words Correctors'],
            parameters: [
                {
                    in: 'path',
                    name: 'incorrect',
                    required: true,
                    schema: {type: 'string'},
                    description: '"incorrect" field id'
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
                                    wordCorrector: {
                                        type: 'object',
                                        properties: {
                                            incorrect: {type: 'string'},
                                            correct: {type: 'string'},
                                            destination_word: {type: 'boolean'},
                                            observation: {type: 'string'},
                                            approved: {type: 'boolean'},
                                            frequence: {type: 'integer'},
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
