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
                            allOf: [{$ref: '#/components/schemas/User'}],
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
                    name: 'q',
                    description: 'word to look up, it will search on username, name, surname, email and documentId',
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
                                    users: {
                                        type: 'array'
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
            security: [
                {bearerAuth: []}
            ],
            operationId: 'newUser',
            description: 'Insert new Arq Profile, Only admins are allowed to perfom actions here',
            requestBody: {
                description: 'Username and Password',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/User'}}}
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
