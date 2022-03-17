module.exports = {
    '/api/relationshipBetweenNomenclators': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Relationship Between Nomenclators'],
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
                                    words: {
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
        },
        post: {
            security: [{bearerAuth: []}],
            tags: ['Relationship Between Nomenclators'],
            requestBody: {
                description: 'The new word to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                correspondenceId: {type: 'number'},
                                description: {type: 'string'},
                                relationTypeId: {type: 'number'},
                                domain: {type: 'string'},
                                nomenclatorId1: {type: 'number'},
                                digitAmountId1: {type: 'number'},
                                nomenclatorId2: {type: 'number'},
                                digitAmountId2: {type: 'number'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'},
                                observation: {type: 'string'},
                                hasCoefficient: {type: 'number'},
                                isInjective: {type: 'number'},
                                isSurjective: {type: 'number'}
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
                                    word: {
                                        type: 'object',
                                        properties: {
                                            correspondenceId: {type: 'number'},
                                            description: {type: 'string'},
                                            relationTypeId: {type: 'number'},
                                            domain: {type: 'string'},
                                            nomenclatorId1: {type: 'number'},
                                            digitAmountId1: {type: 'number'},
                                            nomenclatorId2: {type: 'number'},
                                            digitAmountId2: {type: 'number'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            observation: {type: 'string'},
                                            hasCoefficient: {type: 'number'},
                                            isInjective: {type: 'number'},
                                            isSurjective: {type: 'number'}
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
    '/api/relationshipBetweenNomenclators/{correspondenceId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Relationship Between Nomenclators'],
            parameters: [
                {
                    in: 'path',
                    name: 'correspondenceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'correspondenceId to update'
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
                                correspondenceId: {type: 'number'},
                                description: {type: 'string'},
                                relationTypeId: {type: 'number'},
                                domain: {type: 'string'},
                                nomenclatorId1: {type: 'number'},
                                digitAmountId1: {type: 'number'},
                                nomenclatorId2: {type: 'number'},
                                digitAmountId2: {type: 'number'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'},
                                observation: {type: 'string'},
                                hasCoefficient: {type: 'number'},
                                isInjective: {type: 'number'},
                                isSurjective: {type: 'number'}
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
                                    word: {
                                        type: 'object',
                                        properties: {
                                            correspondenceId: {type: 'number'},
                                            description: {type: 'string'},
                                            relationTypeId: {type: 'number'},
                                            domain: {type: 'string'},
                                            nomenclatorId1: {type: 'number'},
                                            digitAmountId1: {type: 'number'},
                                            nomenclatorId2: {type: 'number'},
                                            digitAmountId2: {type: 'number'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            observation: {type: 'string'},
                                            hasCoefficient: {type: 'number'},
                                            isInjective: {type: 'number'},
                                            isSurjective: {type: 'number'}
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
            tags: ['Relationship Between Nomenclators'],
            parameters: [
                {
                    in: 'path',
                    name: 'correspondenceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'correspondenceId to delete'
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
            tags: ['Relationship Between Nomenclators'],
            parameters: [
                {
                    in: 'path',
                    name: 'correspondenceId',
                    required: true,
                    schema: {type: 'string'},
                    description: 'correspondenceId to update'
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
                                            correspondenceId: {type: 'number'},
                                            description: {type: 'string'},
                                            relationTypeId: {type: 'number'},
                                            domain: {type: 'string'},
                                            nomenclatorId1: {type: 'number'},
                                            digitAmountId1: {type: 'number'},
                                            nomenclatorId2: {type: 'number'},
                                            digitAmountId2: {type: 'number'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
                                            observation: {type: 'string'},
                                            hasCoefficient: {type: 'number'},
                                            isInjective: {type: 'number'},
                                            isSurjective: {type: 'number'}
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
    '/api/relationshipBetweenNomenclators/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Relationship Between Nomenclators'],
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
