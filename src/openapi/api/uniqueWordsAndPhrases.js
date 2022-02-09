module.exports = {
    '/api/uniqueWordsAndPhrases/getLotsVariables': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['UniqueWordsAndPhrases'],
            description: 'Get the lots variables that are  ready to run unique words and phrases process',
            parameters: [
                {
                    in: 'query',
                    name: 'lotId',
                    required: false,
                    schema: {type: 'integer'}
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
                                    lotsVariables: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/LotVariable'}
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
    '/api/uniqueWordsAndPhrases/runProcess/{operativeId}/{lotId}/{variableId}': {
        post: {
            security: [{bearerAuth: []}],
            tags: ['UniqueWordsAndPhrases'],
            description: 'Run unique words and phrases process by operative id, lot id and vairable id',
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'integer'}
                },
                {
                    in: 'path',
                    name: 'lotId',
                    required: true,
                    schema: {type: 'integer'}
                },
                {
                    in: 'path',
                    name: 'variableId',
                    required: true,
                    schema: {type: 'string'}
                }
            ],
            responses: {
                204: {description: 'The PLSql stored procedure was finished successfully.'},
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
