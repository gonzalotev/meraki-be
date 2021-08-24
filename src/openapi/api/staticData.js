module.exports = {
    '/api/staticData': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
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
                },
                {
                    in: 'query',
                    name: 'levels',
                    required: false,
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    name: 'relationshipAutophrasesLetter',
                    required: false,
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    name: 'ticketTypes',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'dictionaryTypes',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'words',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'variables',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'genders',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'operatives',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'variablesNewsWords',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'newWoord',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'autoPhrase',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'nomenclaturesGroup',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'nomenclatorsGroup',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'relationshipGroup',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'newPhrases',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'nomenclators',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'lots',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'fonts',
                    required: false,
                    schema: {type: 'boolean'}
                }
                ,
                {
                    in: 'query',
                    name: 'nomenclatures',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'sources',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'questions',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'questionsTypes',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'operativeType',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'frequency',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'support',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'entryFieldsNames',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'editors',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'documentsTypes',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'originalAuxiliariesFields',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'microprocesses',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'finalAuxiliariesFields',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'datatypes',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'linguisticFieldProcesses',
                    required: false,
                    schema: {type: 'boolean'}
                },
                {
                    in: 'query',
                    name: 'microprocessesLists',
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
                                    },
                                    dictionaries: {
                                        type: 'array',
                                        items: {}
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
                                            userDeleted: null
                                        },
                                        {
                                            id: 'SUPERVISOR',
                                            description: 'Supervisor description',
                                            observation: 'Supervisor observation',
                                            domain: 'Supervisor domain',
                                            createdAt: '2021-03-15',
                                            deletedAt: '2021-03-16',
                                            userCreator: 1,
                                            userDeleted: 2
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
    },
    '/api/staticData/shortDescription': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static nomenclatorsvalues',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Nomenclators'}
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
    '/api/staticData/lots': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static lots values',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Lots'}
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
    '/api/staticData/roles': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static roles values',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Roles'}
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
    '/api/staticData/staticalVariables': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get static roles values',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nomenclators: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/StatisticalVariable'}
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
    '/api/staticData/newWords': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Static Data'],
            summary: 'Get operatives with their variables',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    operatives: {
                                        type: 'array',
                                        items: {}
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
    }
};
