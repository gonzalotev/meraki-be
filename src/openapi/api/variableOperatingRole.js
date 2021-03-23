module.exports = {
    '/api/variable-operating-role': {
        get: {
            summary: 'List of variables operating role',
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    required: true,
                    schema: {type: 'integer'}
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
                                    limit: {type: 'integer'},
                                    total: {type: 'integer'},
                                    rolOperatives: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/VariableOperatingRole'},
                                        example: {
                                            ID_USUARIO: 1,
                                            ID_ROL_USUARIO: 'CODIFICADOR',
                                            ID_OPERATIVO: '1',
                                            ID_LOTE: '1',
                                            ID_VARIABLE: '20011',
                                            OBSERVACION: 'Juan esta codificando',
                                            DOMINIO: 'null',
                                            SI_NO: 1,
                                            FECHA_ALTA: '2021-02-08T03:00:00.000Z',
                                            FECHA_BAJA: '2021-02-08T03:00:00.000Z'
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
            summary: 'Create new rol operativo variable',
            security: [
                {bearerAuth: []}
            ],
            requestBody: {
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/VariableOperatingRole'}}}
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
                                    insertedOne: {$ref: '#/components/schemas/VariableOperatingRole'}
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: 'Update rol operativo variable',
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'query',
                    required: true,
                    name: 'ID_ROL_USUARIO',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'OBSERVACION',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'ID_VARIABLE',
                    schema: {type: 'string'}
                }
            ],
            requestBody: {
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/VariableOperatingRole'}}}
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
                                    updatedOne: {$ref: '#/components/schemas/VariableOperatingRole'}
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
            summary: 'Delete rol operativo variable',
            security: [
                {bearerAuth: []}
            ],
            parameters: [
                {
                    in: 'query',
                    required: true,
                    name: 'ID_ROL_USUARIO',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'OBSERVACION',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'ID_VARIABLE',
                    schema: {type: 'string'}
                }
            ],
            responses: {
                200: {
                    description: 'ok',
                    content: {'application/json': {schema: {type: 'object'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    }
};
