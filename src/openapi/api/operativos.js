module.exports = {
    '/api/operativos' : {
        get : {
            summary : 'List of operativos',
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
                                    operativos: {
                                        type: 'array',
                                        items:{$ref: '#/components/schemas/Operativos'},
                                        example:{
                                            ID_OPERATIVO: 1,
                                            ID_FUENTE: 1,
                                            DESCRIPCION: 'Operativo EPH 2do trimestre 2020',
                                            OBSERVACION: null,
                                            DOMINIO: null,
                                            FECHA_LLEGADA_OPERATIVO: null,
                                            TOTAL_REGISTROS_OPERATIVO: null,
                                            CONTACTO_OPERATIVO: null,
                                            MAIL_CONTACTO: null,
                                            FECHA_INICIO_CODIFICACION: null,
                                            FECHA_FIN_CODIFICACION: null,
                                            FECHA_INICIO_ENTREGA: null,
                                            FECHA_INICIO_BORRADO: null,
                                            FECHA_FIN_BORRADO: null,
                                            CALIDAD_TOTAL_OPERATIVO: null,
                                            NIVEL_ERROR_OPERATIVO: null,
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
            summary: 'Create new operativo',
            security: [],
            requestBody:{
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/Operativos'}}}
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
                                    insertedOne: {$ref: '#/components/schemas/Operativos'}
                                }
                            }
                        }
                    }
                }
            }
        },
        put: {
            summary: 'Update operativo',
            security: [],
            parameters: [
                {
                    in: 'query',
                    required: true,
                    name: 'DESCRIPCION',
                    schema: {type: 'string'}
                },
                // {
                //     in: 'query',
                //     required: true,
                //     name: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                //     schema: {type: 'string'}
                // },
                // {
                //     in: 'query',
                //     required: true,
                //     name: 'ID_VARIABLE',
                //     schema: {type: 'string'}
                // }
            ],
            requestBody:{
                description: 'The new user-rol',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/Operativos'}}}
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
                                    updatedOne: {$ref: '#/components/schemas/Operativos'}
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
            summary: 'Delete operativo',
            security: [],
            parameters: [
                {
                    in: 'query',
                    required: true,
                    name: 'DESCRIPCION',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'ID_OPERATIVO',
                    schema: {type: 'string'}
                },
                {
                    in: 'query',
                    required: true,
                    name: 'ID_FUENTE',
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
    '/api/operativo/{DESCRIPCION}/{ID_OPERATIVO}/{ID_FUENTE}' : {
        get : {
            summary : 'List of operativos',
            security : [],
            parameters : [
                {
                    in: 'path',
                    name: 'DESCRIPCION',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'ID_OPERATIVO',
                    required: true,
                    schema: {type: 'string'}
                },
                {
                    in: 'path',
                    name: 'ID_FUENTE',
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
                                properties: {operativo: {$ref: '#/components/schemas/Operativos'}}
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
