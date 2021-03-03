module.exports = {
    '/public-api/session': {
        post: {
            operationId: 'validate token',
            security: [],
            description: 'Action to validate token inside BE',
            requestBody: {
                description: 'Token',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['token'],
                            properties: {token: {type: 'string'}}
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'validate token success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/ValidateToken'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/public-api/login': {
        post: {
            operationId: 'login',
            security: [],
            description: 'login',
            requestBody: {
                description: 'Username and Password',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['username', 'password'],
                            properties: {
                                username: {type: 'string'},
                                password: {
                                    type: 'string',
                                    format: 'password'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'validate login success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Profile'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
