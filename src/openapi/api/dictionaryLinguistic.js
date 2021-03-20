module.exports = {
    '/api/dictionaryLinguistic': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 1,
                        minimum: 1
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
                                    dictionary: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/DictionaryLinguistic'}
                                    }
                                },
                                example: {
                                    dictionary: [
                                        {
                                            id_user: 1,
                                            id_role: 'AUDITOR',
                                            description: 'auditor description',
                                            domain: 'auditor domain',
                                            observation: 'auditor observation',
                                            createdAt: '2021-03-15',
                                            deletedAt: '2021-03-15'
                                        },
                                        {
                                            id_user: 2,
                                            id_role: 'FAKE',
                                            description: 'fake description',
                                            domain: 'fake domain',
                                            observation: 'fake observation',
                                            createdAt: '2021-03-15',
                                            deletedAt: null
                                        }
                                    ]
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
