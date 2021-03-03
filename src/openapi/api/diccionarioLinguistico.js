module.exports = {
    '/api/diccionarioLinguistico' : {
        get : {
            summary : 'List of diccionarios linguisticos',
            security : [],
            parameters : [
                {
                    in: 'query',
                    name: 'page',
                    required: true,
                    schema: {type: 'integer'}
                }
            ],
            responses : {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    limit: {type: 'integer'},
                                    total: {type: 'integer'},
                                    diccionarios: {
                                        type: 'array',
                                        items:{$ref: '#/components/schemas/DiccionarioLinguistico'},
                                        example:{
                                            DESCRIPCION_ORIGINAL: 'ME',
                                            ID_TIPOLOGIA_DE_DICCIONARIO: 'ANU',
                                            ID_VARIABLE: '20011',
                                            DESCRIPCION_DESTINO: null,
                                            OBSERVACION: null,
                                            DOMINIO: null,
                                            SUPERVISADO: null,
                                            ID_USUARIO_ALTA: 1,
                                            FECHA_ALTA: '2021-02-08T03:00:00.000Z'
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
            summary: 'Create new diccionario linguistico',
            security: [],
            requestBody:{
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/DiccionarioLinguistico'}}}
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
                                    insertedOne: {$ref: '#/components/schemas/DiccionarioLinguistico'}
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: 'Update diccionario linguistico',
            security: [],
            parameters: [
                {
                    in: 'query',
                    required: true,
                    name: 'DESCRIPCION_ORIGINAL',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'ID_VARIABLE',
                    schema: {type: 'string'}
                }
            ],
            requestBody:{
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/DiccionarioLinguistico'}}}
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
                                    updatedOne: {$ref: '#/components/schemas/DiccionarioLinguistico'}
                                }
                            }
                        }
                    }
                },
                default: {
                    description: 'Error',
                    content : {'application/json': {schema:{$ref:'#/components/schemas/Error'}}}
                }
            }
        },
        delete: {
            summary: 'Delete diccionario linguistico',
            security: [],
            parameters: [
                {
                    in: 'query',
                    required: true,
                    name: 'DESCRIPCION_ORIGINAL',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'ID_TIPOLOGIA_DE_DICCIONARIO',
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
                    content : {'application/json': {schema:{$ref:'#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/diccionarioLinguistico/{DESCRIPCION_ORIGINAL}/{ID_TIPOLOGIA_DE_DICCIONARIO}/{ID_VARIABLE}' : {
        get : {
            summary : 'List of diccionarios linguisticos',
            security : [],
            parameters : [
                {
                    in: 'path',
                    name: 'DESCRIPCION_ORIGINAL',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'ID_VARIABLE',
                    required: true,
                    schema: {type: 'string'}
                }
            ],
            responses : {
                200: {
                    description: 'ok',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {diccionario: {$ref: '#/components/schemas/DiccionarioLinguistico'}}
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
