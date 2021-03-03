module.exports = {
    '/api/users/session': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'session',
            description: 'Return current session',
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Profile'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/users/{id}': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'fetchUser',
            description: 'Return an User',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/ProfileUser'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        delete: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'deleteUser',
            description: 'Delete or Enable an User',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Update Succeded',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {success: {type: 'string'}}
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
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'updateUser',
            description: 'Insert new Arq Profile, Only admins are allowed to perfom actions here',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    }
                }
            ],
            requestBody: {
                description: 'Username and Password',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            allOf: [{$ref: '#/components/schemas/CreateUser'}],
                            required: ['id']
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Update Succeded',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {success: {type: 'string'}}
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
    '/api/users': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'fetchUsers',
            description: 'Return list of User',
            parameters: [
                {
                    name: 'role',
                    in: 'query',
                    description: 'One or more Role',
                    schema: {type: 'string'}
                },
                {
                    name: 'term',
                    description: 'word to look up, it will search on username, name, surname, email and documentId',
                    in: 'query',
                    schema: {type: 'string'}
                },
                {
                    name: 'skip',
                    in: 'query',
                    description: 'Skip of current pagination',
                    schema: {
                        type: 'integer',
                        minimum: 0,
                        default: 0
                    }
                },
                {
                    name: 'state',
                    in: 'query',
                    description: 'stateId of the profile',
                    schema: {
                        type: 'string',
                        enum: [
                            '02',
                            '06',
                            '10',
                            '14',
                            '18',
                            '22',
                            '26',
                            '30',
                            '34',
                            '38',
                            '42',
                            '46',
                            '50',
                            '54',
                            '58',
                            '62',
                            '66',
                            '70',
                            '74',
                            '78',
                            '82',
                            '86',
                            '90',
                            '94',
                            '99'
                        ]
                    }
                },
                {
                    name: 'department',
                    in: 'query',
                    schema: {type: 'string'}
                },
                {
                    name: 'assignment',
                    in: 'query',
                    schema: {type: 'string'}
                },
                {
                    name: 'fraction',
                    in: 'query',
                    schema: {type: 'string'}
                },
                {
                    name: 'segment',
                    in: 'query',
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
                                    documents: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/ProfileUser'}
                                    },
                                    toal: {type: 'integer'}
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
            security: [
                {bearerAuth: []}
            ],
            operationId: 'newUser',
            description: 'Insert new Arq Profile, Only admins are allowed to perfom actions here',
            requestBody: {
                description: 'Username and Password',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/CreateUser'}}}
            },
            responses: {
                200: {
                    description: 'Update Succeded',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {}
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
    '/api/users/password/recovery': {
        post: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'askPasswordRecovery',
            description: 'Request new user password',
            requestBody: {
                description: 'Id, Email and Password',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['username', 'id', 'email'],
                            properties: {
                                id: {
                                    type: 'string',
                                    format: 'uuid'
                                },
                                username: {type: 'string'},
                                email: {type: 'string'}
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Submit succeeded',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {}
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
