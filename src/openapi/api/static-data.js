module.exports = {
    '/api/static-data': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            summary: 'Get types attributes',
            description: `**Return** *italic*
                [data](https://www.google.com/search?q=traductor&oq=tr&aqs=chrome.1.69i60j69i59j69i57j69i59l2j69i61j69i60l2.2142j0j7&sourceid=chrome&ie=UTF-8) preload`,
            parameters: [
                {
                    in: 'query',
                    name: 'role',
                    required: false,
                    schema: {
                        type: 'boolean',
                        enum: [true, false]
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
                                properties: { roles: { type: 'array'}}
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            },
            externalDocs: {
                description: 'Learn more about user operations provided by this API.',
                url: 'http://api.example.com/docs/user-operations/'
            }
        }
    }
};
