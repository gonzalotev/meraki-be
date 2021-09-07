module.exports = {
    '/api/operatives': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operatives'],
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
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    words: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Operatives'}
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
            tags: ['Operatives'],
            requestBody: {
                description: 'The new operative source to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'string'},
                                operativeId: {type: 'string'},
                                arrivalDate: {type: 'string'},
                                codingEndDate: {type: 'string'},
                                codingStartDate: {type: 'string'},
                                deletedEndDate: {type: 'string'},
                                deletedStartDate: {type: 'string'},
                                deliveryStartDate: {type: 'string'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                mailContact: {type: 'string'},
                                operatingContact: {type: 'string'},
                                operatingErrorLevel: {type: 'string'},
                                qualityOperational: {type: 'string'},
                                totalRecords: {type: 'string'},
                                domain: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                userDeleted: {type: 'string'},
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
                                    operative: {
                                        type: 'object',
                                        properties: {
                                            sourceId: {type: 'string'},
                                            operativeId: {type: 'string'},
                                            arrivalDate: {type: 'string'},
                                            codingEndDate: {type: 'string'},
                                            codingStartDate: {type: 'string'},
                                            deletedEndDate: {type: 'string'},
                                            deletedStartDate: {type: 'string'},
                                            deliveryStartDate: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            mailContact: {type: 'string'},
                                            operatingContact: {type: 'string'},
                                            operatingErrorLevel: {type: 'string'},
                                            qualityOperational: {type: 'string'},
                                            totalRecords: {type: 'string'},
                                            domain: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
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
    '/api/operatives/{operativeId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Operatives'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Operative Source to update'
                }
            ],
            requestBody: {
                description: 'Changes to save',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                sourceId: {type: 'string'},
                                operativeId: {type: 'string'},
                                arrivalDate: {type: 'string'},
                                codingEndDate: {type: 'string'},
                                codingStartDate: {type: 'string'},
                                deletedEndDate: {type: 'string'},
                                deletedStartDate: {type: 'string'},
                                deliveryStartDate: {type: 'string'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                mailContact: {type: 'string'},
                                operatingContact: {type: 'string'},
                                operatingErrorLevel: {type: 'string'},
                                qualityOperational: {type: 'string'},
                                totalRecords: {type: 'string'},
                                domain: {type: 'string'},
                                createdAt: {type: 'string'},
                                userCreator: {type: 'string'},
                                userDeleted: {type: 'string'},
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
                                    operative: {
                                        type: 'object',
                                        properties: {
                                            sourceId: {type: 'string'},
                                            operativeId: {type: 'string'},
                                            arrivalDate: {type: 'string'},
                                            codingEndDate: {type: 'string'},
                                            codingStartDate: {type: 'string'},
                                            deletedEndDate: {type: 'string'},
                                            deletedStartDate: {type: 'string'},
                                            deliveryStartDate: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            mailContact: {type: 'string'},
                                            operatingContact: {type: 'string'},
                                            operatingErrorLevel: {type: 'string'},
                                            qualityOperational: {type: 'string'},
                                            totalRecords: {type: 'string'},
                                            domain: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
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
            tags: ['Operatives'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Operative Source to update'
                }
            ],
            responses: {
                204: {
                    description: 'The resource was deleted successfully',
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
            tags: ['Operatives'],
            parameters: [
                {
                    in: 'path',
                    name: 'operativeId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'Operative Source to update'
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
                                    word: {
                                        type: 'object',
                                        properties: {
                                            sourceId: {type: 'string'},
                                            operativeId: {type: 'string'},
                                            arrivalDate: {type: 'string'},
                                            codingEndDate: {type: 'string'},
                                            codingStartDate: {type: 'string'},
                                            deletedEndDate: {type: 'string'},
                                            deletedStartDate: {type: 'string'},
                                            deliveryStartDate: {type: 'string'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            mailContact: {type: 'string'},
                                            operatingContact: {type: 'string'},
                                            operatingErrorLevel: {type: 'string'},
                                            qualityOperational: {type: 'string'},
                                            totalRecords: {type: 'string'},
                                            domain: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            userDeleted: {type: 'string'},
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
    '/api/operatives/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Operatives'],
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
