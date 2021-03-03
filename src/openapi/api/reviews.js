module.exports = {
    '/api/review/': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getSurveys',
            description: 'Return list of surveys',
            parameters: [
                {$ref: '#/components/parameters/State'},
                {$ref: '#/components/parameters/Ups'},
                {$ref: '#/components/parameters/Area'},
                {$ref: '#/components/parameters/Status'},
                {$ref: '#/components/parameters/Situation'},
                {$ref: '#/components/parameters/TeamLeader'},
                {$ref: '#/components/parameters/Pollster'},
                {$ref: '#/components/parameters/Skip'}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    surveys: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Review'}
                                    },
                                    count: {type: 'number'}
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
    '/api/review/{id}/address': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getSurveyById',
            description: 'Return survey',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Survey`s id',
                    schema: {type: 'number'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: {$ref: '#/components/schemas/Review'}
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
    '/api/review/{id}/finish': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'finishSurvey',
            description: 'Set survey as finished',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Survey`s id',
                    schema: {type: 'number'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/review/{id}/approve': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'approveSurvey',
            description: 'Set survey as approved',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Survey`s id',
                    schema: {type: 'number'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/review/{id}/reassign/{user}': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'reassignSurvey',
            description: 'Set survey as on field',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Survey`s id',
                    schema: {type: 'number'},
                    required: true
                },
                {
                    in: 'path',
                    name: 'user',
                    description: 'User`s id',
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    },
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/review/{id}/reopen': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'reopenSurvey',
            description: 'Set survey as on field',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Survey`s id',
                    schema: {type: 'number'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/review/{id}/recovery': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'recoverySurvey',
            description: 'Set survey in recovery',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Survey`s id',
                    schema: {type: 'number'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/review/{id}/supervision/{user}': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'superviseSurvey',
            description: 'Set survey as supervised',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Survey`s id',
                    schema: {type: 'number'},
                    required: true
                },
                {
                    in: 'path',
                    name: 'user',
                    description: 'User`s id',
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    },
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/review/{id}': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getSurveyData',
            description: 'Return survey data',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    description: 'Survey`s id',
                    schema: {type: 'number'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: {$ref: '#/components/schemas/Survey'}
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
