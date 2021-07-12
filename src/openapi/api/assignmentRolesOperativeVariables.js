module.exports = {
    '/api/assignmentRolesOperativeVariables': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles Operatives Variables'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'string',
                        default: 1
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
                                    roles: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: {type: 'string'},
                                                userId: {type: 'string'},
                                                operativeId: {type: 'integer'},
                                                lotId: {type: 'integer'},
                                                variableId: {type: 'string'},
                                                domain: {type: 'string'},
                                                observation: {type: 'string'},
                                                yes_no: {type: 'boolean'},
                                                userName: {type: 'string'},
                                                createdAt: {type: 'string'},
                                                deletedAt: {type: 'string'}
                                            }
                                        }
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
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles Operatives Variables'],
            requestBody: {
                description: 'The new autophrase to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                userId: {type: 'string'},
                                operativeId: {type: 'integer'},
                                lotId: {type: 'integer'},
                                variableId: {type: 'string'},
                                domain: {type: 'string'},
                                observation: {type: 'string'},
                                userName: {type: 'string'},
                                yes_no: {type: 'boolean'},
                                createdAt: {type: 'string'},
                                deletedAt: {type: 'string'}
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    role: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            userId: {type: 'string'},
                                            operativeId: {type: 'integer'},
                                            lotId: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
                                            userName: {type: 'string'},
                                            yes_no: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            deletedAt: {type: 'string'}
                                        }
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
    '/api/assignmentRolesOperativeVariables/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles Operatives Variables'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new role operative variable to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                id: {type: 'string'},
                                userId: {type: 'string'},
                                operativeId: {type: 'integer'},
                                lotId: {type: 'integer'},
                                variableId: {type: 'string'},
                                domain: {type: 'string'},
                                observation: {type: 'string'},
                                userName: {type: 'string'},
                                yes_no: {type: 'boolean'},
                                createdAt: {type: 'string'},
                                deletedAt: {type: 'string'}
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {type: 'boolean'},
                                    role: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            userId: {type: 'string'},
                                            operativeId: {type: 'integer'},
                                            lotId: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
                                            userName: {type: 'string'},
                                            yes_no: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            deletedAt: {type: 'string'}
                                        }
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
        delete: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles Operatives Variables'],

            responses: {
                200: {
                    description: 'ok',
                    content: {'application/json': { schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        },
        get: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles Operatives Variables'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    role: {
                                        type: 'object',
                                        properties: {
                                            id: {type: 'string'},
                                            userId: {type: 'string'},
                                            operativeId: {type: 'integer'},
                                            lotId: {type: 'integer'},
                                            variableId: {type: 'string'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
                                            userName: {type: 'string'},
                                            yes_no: {type: 'boolean'},
                                            createdAt: {type: 'string'},
                                            deletedAt: {type: 'string'}
                                        }
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
    '/api/assignmentRolesOperativeVariables/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles Operatives Variables'],
            parameters: [
                {
                    in: 'query',
                    name: 'search',
                    required: false,
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
                                    dictionaryLinguistics: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/DictionaryLinguistic'}
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
