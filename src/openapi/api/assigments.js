module.exports = {
    '/api/assigments': {
        post: {
            security: [
                {bearerAuth: []}
            ],
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
    }
};
