module.exports = {
    '/api/assignmentRoles': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles'],
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
                                                roleId: {type: 'string'},
                                                description: {type: 'string'},
                                                domain: {type: 'string'},
                                                observation: {type: 'string'},
                                                userId: {type: 'string'},
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
            tags: ['Assignment Roles'],
            requestBody: {
                description: 'The new role to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                roleId: {type: 'string'},
                                description: {type: 'string'},
                                domain: {type: 'string'},
                                observation: {type: 'string'},
                                userId: {type: 'string'},
                                userName: {type: 'string'}
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
                                            roleId: {type: 'string'},
                                            description: {type: 'string'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
                                            userId: {type: 'string'},
                                            userName: {type: 'string'},
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
    '/api/assignmentRoles/{roleId}/{userId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles'],
            parameters: [
                {
                    in: 'path',
                    name: 'roleId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'userId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new role to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                roleId: {type: 'string'},
                                description: {type: 'string'},
                                domain: {type: 'string'},
                                observation: {type: 'string'},
                                userId: {type: 'string'},
                                userName: {type: 'string'},
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
                                            roleId: {type: 'string'},
                                            description: {type: 'string'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
                                            userId: {type: 'string'},
                                            userName: {type: 'string'},
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
            tags: ['Assignment Roles'],
            parameters: [
                {
                    in: 'path',
                    name: 'roleId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'userId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
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
            tags: ['Assignment Roles'],
            parameters: [
                {
                    in: 'path',
                    name: 'roleId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'userId',
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
                                            roleId: {type: 'string'},
                                            description: {type: 'string'},
                                            domain: {type: 'string'},
                                            observation: {type: 'string'},
                                            userId: {type: 'string'},
                                            userName: {type: 'string'},
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
    '/api/assignmentRoles/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            operationId: 'downloadAssignmentRoles',
            description: 'Returns assignment roles in csv format',
            tags: ['Assignment Roles'],
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
    },
    '/api/assignmentRoles/roles': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Assignment Roles'],
            parameters: [
                {
                    in: 'query',
                    name: 'userId',
                    required: false,
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    name: 'assigned',
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
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string' },
                                                description: { type: 'string' }
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
        }
    }
};
