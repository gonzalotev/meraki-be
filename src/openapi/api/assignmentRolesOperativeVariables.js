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
                        type: 'number',
                        default: 0
                    }
                },
                {
                    in: 'query',
                    name: 'limit',
                    required: false,
                    schema: {
                        type: 'number',
                        default: 0
                    }
                },
                {
                    in: 'query',
                    name: 'search',
                    required: false,
                    schema: {
                        type: 'string',
                        default: ''
                    }
                },
                {
                    in: 'query',
                    name: 'orderBy',
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
                                    assigments: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/AssigmentRoleOperativeVariable'}
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
                                roleId: {type: 'string'},
                                userId: {type: 'string'},
                                operativeId: {type: 'integer'},
                                lotId: {type: 'integer'},
                                variableId: {type: 'string'},
                                domain: {type: 'string'},
                                observation: {type: 'string'},
                                yesNo: {type: 'boolean'},
                                userName: {type: 'string'},
                                operative: {type: 'string'},
                                lot: {type: 'string'},
                                variable: {type: 'string'}
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
                                    assigment: {$ref: '#/components/schemas/AssigmentRoleOperativeVariable'}
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
    '/api/assignmentRolesOperativeVariables/{ids}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles Operatives Variables'],
            parameters: [
                {
                    in: 'path',
                    name: 'ids',
                    required: true,
                    schema: {type: 'string'}
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
                                roleId: {type: 'string'},
                                userId: {type: 'string'},
                                operativeId: {type: 'integer'},
                                lotId: {type: 'integer'},
                                variableId: {type: 'string'},
                                domain: {type: 'string'},
                                observation: {type: 'string'},
                                yesNo: {type: 'boolean'},
                                userName: {type: 'string'},
                                operative: {type: 'string'},
                                lot: {type: 'string'},
                                variable: {type: 'string'}
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
                                    assigment: {$ref: '#/components/schemas/AssigmentRoleOperativeVariable'}
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
            parameters: [
                {
                    in: 'path',
                    name: 'ids',
                    required: true,
                    schema: {type: 'string'}
                }
            ],
            responses: {
                204: {description: 'The resource was deleted successfully.'},
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
                    name: 'ids',
                    required: true,
                    schema: {type: 'string'}
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
                                    assigment: {$ref: '#/components/schemas/AssigmentRoleOperativeVariable'}
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
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'text/csv': {
                            schema: {type: 'string', format: 'binary'}
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
