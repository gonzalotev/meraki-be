module.exports = {
    '/api/assignments': {
        post: {
            security: [
                {bearerAuth: []}
            ],
            tags: ['Assignments'],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/Assigment'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Success'}}}
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
            tags: ['Assignments'],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/Assigment'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Success'}}}
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
            tags: ['Assignments'],
            requestBody: {
                required: true,
                content: { 'application/json': {schema: {$ref: '#/components/schemas/Assigment'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': { schema: { $ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/assignments/{userId}': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            tags: ['Assignments'],
            parameters: [
                {
                    in: 'path',
                    name: 'userId',
                    required: true,
                    schema: {type: 'string', maxLength: 50},
                    description: 'User id of assignment'
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: { userRole: { $ref: '#/components/schemas/Assigment'}}
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
