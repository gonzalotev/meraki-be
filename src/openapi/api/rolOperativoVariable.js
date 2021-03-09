module.exports = {
    '/api/rolOperativoVariable': {
        get: {
            summary: 'List of roles operativos variables',
            security: [],
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
                                    roloperativos: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/RolOperativoVariable'},
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
            security: [],
            requestBody: {
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/RolOperativoVariable'}}}
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
                                    insertedOne: {$ref: '#/components/schemas/RolOperativoVariable'}
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: 'Update rol operativo variable',
            security: [],
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
                content: {'application/json': {schema: {$ref: '#/components/schemas/RolOperativoVariable'}}}
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
                                    updatedOne: {$ref: '#/components/schemas/RolOperativoVariable'}
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
            security: [],
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
    },
    '/api/rolOperativoVariable/{ID_ROL_USUARIO}/{OBSERVACION}/{ID_VARIABLE}': {
        get: {
            summary: 'List of roles operativos variables',
            security: [],
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
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {roloperativovariable: {$ref: '#/components/schemas/RolOperativoVariable'}}
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
