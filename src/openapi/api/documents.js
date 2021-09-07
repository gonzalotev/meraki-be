module.exports = {
    '/api/documents': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Documentos'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    documents: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                documentId: {type: 'string'},
                                                documentTypeId: {type: 'string'},
                                                title: {type: 'string'},
                                                author: {type: 'string'},
                                                institution: {type: 'string'},
                                                area: {type: 'string'},
                                                documentDate: {type: 'string'},
                                                isbn: {type: 'number'},
                                                editorId: {type: 'number'},
                                                fileLocation: {type: 'string'},
                                                summary: {type: 'string'},
                                                url: {type: 'string'},
                                                commentary: {type: 'string'},
                                                numberOfVisits: {type: 'string'},
                                                userCreator: {type: 'string'},
                                                createdAt: {type: 'string'},
                                                userDeleted: {type: 'string'},
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
            tags: ['Documentos'],
            requestBody: {
                description: 'The new  document to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                documentTypeId: {type: 'string'},
                                title: {type: 'string'},
                                author: {type: 'string'},
                                institution: {type: 'string'},
                                area: {type: 'string'},
                                documentDate: {type: 'string'},
                                isbn: {type: 'number'},
                                editorId: {type: 'number'},
                                fileLocation: {type: 'string'},
                                summary: {type: 'string'},
                                url: {type: 'string'},
                                commentary: {type: 'string'},
                                numberOfVisits: {type: 'string'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'},
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
                                    document: {
                                        type: 'object',
                                        properties: {
                                            documentId: {type: 'string'},
                                            documentTypeId: {type: 'string'},
                                            title: {type: 'string'},
                                            author: {type: 'string'},
                                            institution: {type: 'string'},
                                            area: {type: 'string'},
                                            documentDate: {type: 'string'},
                                            isbn: {type: 'number'},
                                            editorId: {type: 'number'},
                                            fileLocation: {type: 'string'},
                                            summary: {type: 'string'},
                                            url: {type: 'string'},
                                            commentary: {type: 'string'},
                                            numberOfVisits: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
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
    '/api/documents/{documentId}/{documentTypeId}/{editorId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Documentos'],
            parameters: [
                {
                    in: 'path',
                    name: 'documentId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'documentTypeId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'editorId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new document to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                documentId: {type: 'string'},
                                documentTypeId: {type: 'string'},
                                title: {type: 'string'},
                                author: {type: 'string'},
                                institution: {type: 'string'},
                                area: {type: 'string'},
                                documentDate: {type: 'string'},
                                isbn: {type: 'number'},
                                editorId: {type: 'number'},
                                fileLocation: {type: 'string'},
                                summary: {type: 'string'},
                                url: {type: 'string'},
                                commentary: {type: 'string'},
                                numberOfVisits: {type: 'string'},
                                userCreator: {type: 'string'},
                                createdAt: {type: 'string'},
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
                                    document: {
                                        type: 'object',
                                        properties: {
                                            documentId: {type: 'string'},
                                            documentTypeId: {type: 'string'},
                                            title: {type: 'string'},
                                            author: {type: 'string'},
                                            institution: {type: 'string'},
                                            area: {type: 'string'},
                                            documentDate: {type: 'string'},
                                            isbn: {type: 'number'},
                                            editorId: {type: 'number'},
                                            fileLocation: {type: 'string'},
                                            summary: {type: 'string'},
                                            url: {type: 'string'},
                                            commentary: {type: 'string'},
                                            numberOfVisits: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
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
            tags: ['Documentos'],
            parameters: [
                {
                    in: 'path',
                    name: 'documentId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'documentTypeId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'editorId',
                    required: true,
                    schema: {type: 'integer'},
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
            tags: ['Documentos'],
            parameters: [
                {
                    in: 'path',
                    name: 'documentId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'documentTypeId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                },
                {
                    in: 'path',
                    name: 'editorId',
                    required: true,
                    schema: {type: 'integer'},
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
                                    document: {
                                        type: 'object',
                                        properties: {
                                            documentId: {type: 'string'},
                                            documentTypeId: {type: 'string'},
                                            title: {type: 'string'},
                                            author: {type: 'string'},
                                            institution: {type: 'string'},
                                            area: {type: 'string'},
                                            documentDate: {type: 'string'},
                                            isbn: {type: 'number'},
                                            editorId: {type: 'number'},
                                            fileLocation: {type: 'string'},
                                            summary: {type: 'string'},
                                            url: {type: 'string'},
                                            commentary: {type: 'string'},
                                            numberOfVisits: {type: 'string'},
                                            userCreator: {type: 'string'},
                                            createdAt: {type: 'string'},
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
    '/api/documents/downloadCsv': {
        get: {
            security: [{bearerAuth: []}],
            operationId: 'downloadDocumentsCSV',
            description: 'Returns documents in csv format',
            tags: ['Documentos'],
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
