module.exports = {
    '/api/staticData': {
        get: {
            security: [{bearerAuth: []}],
            summary: 'Get static values',
            description: `**Get** all the basic data of the application, *eg*: role types.
                            To get data, just send the resource name equal to true.
                            eg: /api/staticData?role=true`,
            parameters: [
                {
                    in: 'query',
                    name: 'roles',
                    required: false,
                    schema: {type: 'boolean'}
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
                                    roles: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Roles'}
                                    }
                                },
                                example: {
                                    roles: [
                                        {
                                            id: 'AUDITOR',
                                            description: 'Auditor description',
                                            observation: 'Auditor observation',
                                            domain: 'Auditor domain',
                                            createdAt: '2021-03-15',
                                            deletedAt: null,
                                            userCreator: 1,
                                            userDestroyer: null
                                        },
                                        {
                                            id: 'SUPERVISOR',
                                            description: 'Supervisor description',
                                            observation: 'Supervisor observation',
                                            domain: 'Supervisor domain',
                                            createdAt: '2021-03-15',
                                            deletedAt: '2021-03-16',
                                            userCreator: 1,
                                            userDestroyer: 2
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
