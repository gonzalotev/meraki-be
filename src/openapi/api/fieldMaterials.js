module.exports = {
    '/api/fieldMaterials': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getFieldMaterials',
            description: 'Return fieldMaterials by State',
            parameters: [{
                in: 'query',
                name: 'state',
                description: 'the id of the state',
                schema: {type: 'string'}
            }],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/FieldMaterial'}
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
    '/api/fieldMaterials/state/{state}': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getFieldMaterialsByUps',
            description: 'Return fieldMaterials by Ups',
            parameters: [{
                in: 'path',
                name: 'state',
                description: 'the id of the state',
                schema: {type: 'string'},
                required: true
            }],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/FieldMaterial'}
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
    '/api/fieldMaterials/state/{state}/ups/{ups}': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getFieldMaterialsByArea',
            description: 'Return fieldMaterials by Area',
            parameters: [{
                in: 'path',
                name: 'state',
                description: 'the id of the state',
                schema: {type: 'string'},
                required: true
            },
            {
                in: 'path',
                name: 'ups',
                description: 'the id of the ups',
                schema: {type: 'string'},
                required: true
            }],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/FieldMaterial'}
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
    '/api/fieldMaterials/state/{state}/ups/{ups}/area/{area}': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getFieldMaterialsByStateUpsArea',
            description: 'Return fieldMaterials by State, Ups and Area',
            parameters: [{
                in: 'path',
                name: 'state',
                description: 'the id of the state',
                schema: {type: 'string'},
                required: true
            },
            {
                in: 'path',
                name: 'ups',
                description: 'the id of the ups',
                schema: {type: 'string'},
                required: true
            },
            {
                in: 'path',
                name: 'area',
                description: 'the id of the area',
                schema: {type: 'string'},
                required: true
            }],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/FieldMaterial'}
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
