module.exports = {
    '/api/types/state/{state}/ups': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getUps',
            description: 'Return the list of ups',
            parameters: [
                {
                    in: 'path',
                    name: 'state',
                    description: 'the id of the state',
                    schema: {type: 'string'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                properties: {ups: {type: 'number'}}
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
    '/api/types/state/{state}/ups/{ups}/areas': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getAreas',
            description: 'Return the list of areas',
            parameters: [
                {
                    in: 'path',
                    name: 'state',
                    description: 'state id',
                    schema: {type: 'string'},
                    required: true
                },
                {
                    in: 'path',
                    name: 'ups',
                    description: 'ups',
                    schema: {type: 'string'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                properties: {area: {type: 'number'}}
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
    '/api/types/state/{state}/ups/{ups}/area/{area}/segments': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getSegments',
            description: 'Return the list of segments',
            parameters: [
                {
                    in: 'path',
                    name: 'state',
                    description: 'state id',
                    schema: {type: 'string'},
                    required: true
                },
                {
                    in: 'path',
                    name: 'ups',
                    description: 'ups',
                    schema: {type: 'string'},
                    required: true
                },
                {
                    in: 'path',
                    name: 'area',
                    description: 'area',
                    schema: {type: 'string'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                properties: {segment: {type: 'number'}}
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
    '/api/types/files': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'files',
            description: 'Return the list of files',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/Files'}
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
    '/api/types/statuses': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getStatuses',
            description: 'Return the list of statuses',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/Statuses'}
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
    '/api/types/assignmentType': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getAssignmentType',
            description: 'Return the list of assignment type',
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/AssignmentType'}
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
    '/api/types/situations/{status}/status': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getUps',
            description: 'Return the list of situations',
            parameters: [
                {
                    in: 'path',
                    name: 'status',
                    description: 'status id',
                    schema: {type: 'number'},
                    required: true
                }
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/Situations'}
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
