module.exports = {
    '/api/variableEstadistica' : {
        get : {
            summary : 'List of variables estadisticas',
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
                                    variables: {
                                        type: 'array',
                                        items:{$ref: '#/components/schemas/VariableEstadistica'},
                                        example:{
                                            NOMBRE: 'Actividad económica',
                                            ABREVIATURA: 'Actividad económica',
                                            ID_VARIABLE: '20011',
                                            DIGITOS: 3,
                                            OBSERVACION: null,
                                            DOMINIO: null,
                                            SUPERVISADO: null,
                                            ID_PADRE: 100,
                                            ID_USUARIO: 1,
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
            summary: 'Create new variable estadistica',
            security: [],
            requestBody:{
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/VariableEstadistica'}}}
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
                                    insertedOne: {$ref: '#/components/schemas/VariableEstadistica'}
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: 'Update variable estadistica',
            security: [],
            parameters : [
                {
                    in: 'path',
                    name: 'NOMBRE',
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
            requestBody:{
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/VariableEstadistica'}}}
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
                                    updatedOne: {$ref: '#/components/schemas/VariableEstadistica'}
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
            summary: 'Delete variable estadistica',
            security: [],
            parameters : [
                {
                    in: 'path',
                    name: 'NOMBRE',
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
    '/api/variableEstadistica/{NOMBRE}/{ID_VARIABLE}/' : {
        get : {
            summary : 'List of variables estadisticas',
            security : [],
            parameters : [
                {
                    in: 'path',
                    name: 'NOMBRE',
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
                                properties: {variable: {$ref: '#/components/schemas/VariableEstadistica'}}
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
