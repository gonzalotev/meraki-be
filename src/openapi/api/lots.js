module.exports = {
    '/api/lots': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Lots'],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: false,
                    schema: {
                        type: 'number',
                        default: 1
                    }
                },
                {
                    in: 'query',
                    name: 'search',
                    required: false,
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'query',
                    name: 'linguisticLots',
                    required: false,
                    schema: {
                        type: 'string'
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
                                    lots: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Lots'}
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
            tags: ['Lots'],
            requestBody: {
                description: 'The new  lot to create',
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                operativeId: {type: 'number'},
                                description: {type: 'string'},
                                observation: {
                                    type: 'string',
                                    nullable: true
                                },
                                domain: {
                                    type: 'string',
                                    nullable: true
                                },
                                numberOfRecords: {
                                    type: 'number',
                                    nullable: true
                                },
                                fileName: {
                                    type: 'string',
                                    nullable: true
                                },
                                fileFormat: {
                                    type: 'string',
                                    nullable: true
                                },
                                lotFile: {
                                    type: 'string',
                                    format: 'binary',
                                    nullable: true
                                }
                            }
                        }
                    },
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                operativeId: {type: 'number'},
                                description: {type: 'string'},
                                observation: {
                                    type: 'string',
                                    nullable: true
                                },
                                domain: {
                                    type: 'string',
                                    nullable: true
                                },
                                numberOfRecords: {
                                    type: 'number',
                                    nullable: true
                                },
                                fileName: {
                                    type: 'string',
                                    nullable: true
                                },
                                fileFormat: {
                                    type: 'string',
                                    nullable: true
                                }
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
                                    lot: {$ref: '#/components/schemas/Lots'}
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
    '/api/lots/{id}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Lots'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'number'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new lot to create',
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                operativeId: {type: 'number'},
                                description: {type: 'string'},
                                observation: {
                                    type: 'string',
                                    nullable: true
                                },
                                domain: {
                                    type: 'string',
                                    nullable: true
                                },
                                numberOfRecords: {
                                    type: 'number',
                                    nullable: true
                                },
                                fileName: {
                                    type: 'string',
                                    nullable: true
                                },
                                fileFormat: {
                                    type: 'string',
                                    nullable: true
                                },
                                lotFile: {
                                    type: 'string',
                                    format: 'binary',
                                    nullable: true
                                }
                            }
                        }
                    },
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                operativeId: {type: 'number'},
                                description: {type: 'string'},
                                observation: {
                                    type: 'string',
                                    nullable: true
                                },
                                domain: {
                                    type: 'string',
                                    nullable: true
                                },
                                numberOfRecords: {
                                    type: 'number',
                                    nullable: true
                                },
                                fileName: {
                                    type: 'string',
                                    nullable: true
                                },
                                fileFormat: {
                                    type: 'string',
                                    nullable: true
                                }
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
                                    lot: {$ref: '#/components/schemas/Lots'}
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
            tags: ['Lots'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'number'},
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
            tags: ['Lots'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {type: 'number'},
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
                                    lot: {$ref: '#/components/schemas/Lots'}
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
    '/api/lots/loadData': {
        post: {
            security: [{bearerAuth: []}],
            tags: ['Lots'],
            requestBody: {
                description: 'The new lot to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                lot: {
                                    type: 'object',
                                    properties: {
                                        operativeId: {type: 'number'},
                                        lotId: {type: 'number'}
                                    }
                                }
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
                                properties: {message: {type: 'string'}}
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
    '/api/lots/getLotsVariables/{lotId}': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Lots'],
            parameters: [
                {
                    in: 'path',
                    name: 'lotId',
                    required: true,
                    schema: {type: 'number'}
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
    '/api/lots/runLinguisticProcess': {
        post: {
            security: [{bearerAuth: []}],
            tags: ['Lots'],
            requestBody: {
                description: 'The new lot to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                lot: {
                                    type: 'object',
                                    properties: {
                                        operativeId: {type: 'number'},
                                        lotId: {type: 'number'},
                                        variableId: {type: 'string'}
                                    }
                                }
                            }
                        }
                    }
                }
            },
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
