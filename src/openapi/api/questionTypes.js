module.exports = {
    '/api/questionTypes': {
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
                                    questions: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {type: 'integer'},
                                                description: {type: 'string'}
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
                description: 'The new  type of question to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
                                description: {type: 'string'}
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
                                    question: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'integer'},
                                            description: {type: 'string'}
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
    '/api/questionTypes/{id}': {
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
                description: 'The new  type of question to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'integer'},
                                description: {type: 'string'}
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
                                    question: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'integer'},
                                            description: {type: 'string'}
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
                                    question: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'integer'},
                                            description: {type: 'string'}
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
    '/api/questionTypes/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Types'],
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
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    dictionaryLinguistics: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/DictionaryLinguistic'}
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
