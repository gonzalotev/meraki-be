module.exports = {
    '/api/assignments/assignmentsByArea': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'fetchAssignmentByArea',
            description: 'Return list of assignments by area',
            parameters: [
                {$ref: '#/components/parameters/State'},
                {$ref: '#/components/parameters/Ups'},
                {$ref: '#/components/parameters/Area'},
                {$ref: '#/components/parameters/Skip'}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    count: {type: 'number'},
                                    results: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Assignment'}
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
    '/api/assignments/assignmentsBySegment': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'fetchAssignmentBySegment',
            description: 'Return list of assignments by segment',
            parameters: [
                {$ref: '#/components/parameters/State'},
                {$ref: '#/components/parameters/Ups'},
                {$ref: '#/components/parameters/Area'},
                {$ref: '#/components/parameters/Segment'},
                {$ref: '#/components/parameters/Skip'}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    count: {type: 'number'},
                                    results: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Assignment'}
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
    '/api/assignments/assignmentsByAddress': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'fetchAssignmentByAddress',
            description: 'Return list of assignments by address',
            parameters: [
                {$ref: '#/components/parameters/State'},
                {$ref: '#/components/parameters/Ups'},
                {$ref: '#/components/parameters/Area'},
                {$ref: '#/components/parameters/Segment'},
                {$ref: '#/components/parameters/Skip'}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    count: {type: 'number'},
                                    results: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Address'}
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
    '/api/assignments/addressesToReassign': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'fetchReassignmentByAddress',
            description: 'Return list of address to reassign',
            parameters: [
                {$ref: '#/components/parameters/State'},
                {$ref: '#/components/parameters/Ups'},
                {$ref: '#/components/parameters/Area'},
                {$ref: '#/components/parameters/Segment'},
                {$ref: '#/components/parameters/Skip'}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    count: {type: 'number'},
                                    results: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/Address'}
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
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'updateAddress',
            description: 'Update address',
            requestBody: {
                description: 'assigns pollster or team leader to address',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/Address'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/assignments': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'updateAssigneeByArea',
            description: 'Update assignment by area',
            requestBody: {
                description: 'assigns person to assignment by area',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/Assignment'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/assignments/segment': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'updateAssigneeBySegment',
            description: 'Update assignment assignee',
            requestBody: {
                description: 'assigns pollster and teamLeader to assignment',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/Assignment'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/assignments/segments': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'getAssignmentsBySegment',
            description: 'Return list of Assignments by Segment',
            parameters: [
                {$ref: '#/components/parameters/State'},
                {$ref: '#/components/parameters/Ups'},
                {$ref: '#/components/parameters/Area'},
                {$ref: '#/components/parameters/Segment'}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {$ref: '#/components/schemas/Assignment'}
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
    '/api/assignments/address': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'updateAddress',
            description: 'Update address',
            requestBody: {
                description: 'assigns pollster or team leader to address',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/Address'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/assignments/subCoordinator': {
        put: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'updateSubCoordinator',
            description: 'Update subCoordinator',
            requestBody: {
                description: 'assigns subCoordinator to address',
                required: true,
                content: {'application/json': {schema: {$ref: '#/components/schemas/SubCoordinator'}}}
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Success'}}}
                },
                default: {
                    description: 'Error',
                    content: {'application/json': {schema: {$ref: '#/components/schemas/Error'}}}
                }
            }
        }
    },
    '/api/assignments/assignmentsByUps': {
        get: {
            security: [
                {bearerAuth: []}
            ],
            operationId: 'fetchAssignmentByUps',
            description: 'Return list of assignments by ups',
            parameters: [
                {$ref: '#/components/parameters/State'},
                {$ref: '#/components/parameters/Ups'}
            ],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    count: {type: 'number'},
                                    results: {
                                        type: 'array',
                                        items: {$ref: '#/components/schemas/AssignmentByUps'}
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
    }
};
