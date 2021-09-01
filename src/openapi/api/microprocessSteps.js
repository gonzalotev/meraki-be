module.exports = {
    '/api/microprocessSteps': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocess Steps'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'number',
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
                                    microprocessSteps: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/MicroprocessStep'}
                                    },
                                    total: {type: 'number'}
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
            tags: ['Microprocess Steps'],
            requestBody: {
                description: 'The new  microprocess step to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                microprocessId: {type: 'string'},
                                order: {type: 'number'},
                                in: {type: 'string', nullable: true},
                                nomenclatorIdNo: {type: 'number', nullable: true},
                                nomenclatureIdNo: {type: 'string', nullable: true},
                                listId: {type: 'number', nullable: true},
                                questionClosedId: {type: 'number', nullable: true},
                                nomenclatorIdYes: {type: 'number', nullable: true},
                                nomenclatureIdYes: {type: 'string', nullable: true},
                                to: {type: 'string', nullable: true},
                                toDestiny: {type: 'string', nullable: true}
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {microprocessStep: {$ref: '#/components/schemas/MicroprocessStep'}}
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
    '/api/microprocessSteps/{microprocessId}/{order}': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Microprocess Steps'],
            parameters: [
                {
                    in: 'path',
                    name: 'microprocessId',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'order',
                    required: true,
                    schema: {type: 'number'}
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {microprocessStep: {$ref: '#/components/schemas/MicroprocessStep'}}
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
        put: {
            security: [{bearerAuth: []}],
            tags: ['Microprocess Steps'],
            parameters: [
                {
                    in: 'path',
                    name: 'microprocessId',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'order',
                    required: true,
                    schema: {type: 'number'}
                }
            ],
            requestBody: {
                description: 'The  dictionary linguistic to update',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                microprocessId: {type: 'string'},
                                order: {type: 'number'},
                                in: {type: 'string', nullable: true},
                                nomenclatorIdNo: {type: 'number', nullable: true},
                                nomenclatureIdNo: {type: 'string', nullable: true},
                                listId: {type: 'number', nullable: true},
                                questionClosedId: {type: 'number', nullable: true},
                                nomenclatorIdYes: {type: 'number', nullable: true},
                                nomenclatureIdYes: {type: 'string', nullable: true},
                                to: {type: 'string', nullable: true},
                                toDestiny: {type: 'string', nullable: true}
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {microprocessStep: {$ref: '#/components/schemas/MicroprocessStep'}}
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
            tags: ['Microprocess Steps'],
            parameters: [
                {
                    in: 'path',
                    name: 'microprocessId',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'order',
                    required: true,
                    schema: {type: 'number'}
                }
            ],
            responses: {
                204: {description: 'The resource was deleted successfully.'},
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
