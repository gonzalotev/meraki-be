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
                                in: {type: 'string'},
                                nomenclatorIdNo: {type: 'number'},
                                nomenclatureIdNo: {type: 'string'},
                                listId: {type: 'number'},
                                questionClosedId: {type: 'number'},
                                nomenclatorIdYes: {type: 'number'},
                                nomenclatureIdYes: {type: 'string'},
                                to: {type: 'string'},
                                toDestiny: {type: 'string'}
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
    '/api/microprocessDefinition/{microprocessId}/{order}': {
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
                                in: {type: 'string'},
                                nomenclatorIdNo: {type: 'number'},
                                nomenclatureIdNo: {type: 'string'},
                                listId: {type: 'number'},
                                questionClosedId: {type: 'number'},
                                nomenclatorIdYes: {type: 'number'},
                                nomenclatureIdYes: {type: 'string'},
                                to: {type: 'string'},
                                toDestiny: {type: 'string'}
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
