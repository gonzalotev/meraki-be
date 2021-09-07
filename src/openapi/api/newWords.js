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
                                                operativeId: {type: 'integer'},
                                                variableId: {type: 'string'},
                                                word: {type: 'string'},
                                                frequency: {type: 'integer'},
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
                                operativeId: {type: 'integer'},
                                variableId: {type: 'string'},
                                word: {type: 'string'},
                                frequency: {type: 'integer'},
                                abc: {type: 'string'},
                                corrected: {type: 'boolean'}
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
                                            operativeId: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            word: {type: 'string'},
                                            frequency: {type: 'integer'},
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
                                            operativeId: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            word: {type: 'string'},
                                            frequency: {type: 'integer'},
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
        }
    },
    '/api/newWords/{operative}/{variable}': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['News Words'],
            description: 'Get the firts new word with operative and variable',
            parameters: [
                {
                    in: 'path',
                    name: 'operative',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'Operative id of new word'
                },
                {
                    in: 'path',
                    name: 'variable',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Variable id of new word'
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
                                            operativeId: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            word: {type: 'string'},
                                            frequency: {type: 'integer'},
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
                                operativeId: {type: 'integer'},
                                variableId: {type: 'string'},
                                word: {type: 'string'},
                                frequency: {type: 'integer'},
                                abc: {type: 'string'},
                                corrected: {type: 'boolean'},
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
                                    newWord: {
                                        type: 'object',
                                        properties: {
                                            operativeId: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            word: {type: 'string'},
                                            frequency: {type: 'integer'},
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
                                            operativeId: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            word: {type: 'string'},
                                            frequency: {type: 'integer'},
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
    '/api/newWords/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['News Words'],
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
