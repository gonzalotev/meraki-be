module.exports = {
    '/api/dictionaryLinguistic': {
        get: {
            security: [{bearerAuth: []}],
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
                                    dictionaryLinguistic: [
                                        {
                                            originalDescription: 'FAKE',
                                            typologyDictionaryId: 'XXX',
                                            variableId: '00000',
                                            destinationDescription: 'fake description',
                                            observation: 'fake observation',
                                            domain: 'fake domain',
                                            approved: false,
                                            createdAt: '2021-02-08',
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
