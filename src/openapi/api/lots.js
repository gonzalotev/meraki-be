module.exports = {
    '/api/lots': {
        get: {
            security: [{bearerAuth: []}],
            tags: ['Lots'],
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    lots: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                operativeId: {type: 'integer'},
                                                lotId: {type: 'integer'},
                                                description: {type: 'string'},
                                                observation: {type: 'string'},
                                                domain: {type: 'string'},
                                                fileName: {type: 'string'},
                                                fileFormat: {type: 'string'},
                                                numberOfRecords: {type: 'integer'},
                                                batchDataLoadDate: {type: 'string'},
                                                endBatchDataLoadDate: {type: 'string'},
                                                TotalBatchQuality: {type: 'integer'},
                                                TotalBatchErrorLevel: {type: 'integer'},
                                                lotRejected: {type: 'boolean'},
                                                batchRejectedDate: {type: 'integer'},
                                                lotApproved: {type: 'boolean'},
                                                lotApprovedDate: {type: 'string'},
                                                feedback: {type: 'boolean'},
                                                feedbackStartDate: {type: 'string'},
                                                endDateFeedBack: {type: 'string'},
                                                lotDeliveredArea: {type: 'boolean'},
                                                lotDeliveryArea: {type: 'string'},
                                                lotDeliveredToDataLake: {type: 'boolean'},
                                                startDateToDataLake: {type: 'string'},
                                                endDateToDataLake: {type: 'string'},
                                                receiptLotOrCopy: {type: 'boolean'},
                                                dateDownloadedBatchReceiptOrCopy: {type: 'string'},
                                                wholeBatchDeleted: {type: 'boolean'},
                                                deleteStartDate: {type: 'string'},
                                                endDateErased: {type: 'string'},
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
            tags: ['Lots'],
            requestBody: {
                description: 'The new  lot to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                approved: {type: 'boolean'}
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
                                    lot: {
                                        type: 'object',
                                        properties: {
                                            operativeId: {type: 'integer'},
                                            lotId: {type: 'integer'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            fileName: {type: 'string'},
                                            fileFormat: {type: 'string'},
                                            numberOfRecords: {type: 'integer'},
                                            batchDataLoadDate: {type: 'string'},
                                            endBatchDataLoadDate: {type: 'string'},
                                            TotalBatchQuality: {type: 'integer'},
                                            TotalBatchErrorLevel: {type: 'integer'},
                                            lotRejected: {type: 'boolean'},
                                            batchRejectedDate: {type: 'integer'},
                                            lotApproved: {type: 'boolean'},
                                            lotApprovedDate: {type: 'string'},
                                            feedback: {type: 'boolean'},
                                            feedbackStartDate: {type: 'string'},
                                            endDateFeedBack: {type: 'string'},
                                            lotDeliveredArea: {type: 'boolean'},
                                            lotDeliveryArea: {type: 'string'},
                                            lotDeliveredToDataLake: {type: 'boolean'},
                                            startDateToDataLake: {type: 'string'},
                                            endDateToDataLake: {type: 'string'},
                                            receiptLotOrCopy: {type: 'boolean'},
                                            dateDownloadedBatchReceiptOrCopy: {type: 'string'},
                                            wholeBatchDeleted: {type: 'boolean'},
                                            deleteStartDate: {type: 'string'},
                                            endDateErased: {type: 'string'},
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
    '/api/lots/{lotId}': {
        put: {
            security: [{bearerAuth: []}],
            tags: ['Lots'],
            parameters: [
                {
                    in: 'path',
                    name: 'lotId',
                    required: true,
                    schema: {type: 'integer'},
                    description: 'User id of assignment'
                }
            ],
            requestBody: {
                description: 'The new lot to create',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                operativeId: {type: 'integer'},
                                lotId: {type: 'integer'},
                                description: {type: 'string'},
                                observation: {type: 'string'},
                                domain: {type: 'string'},
                                fileName: {type: 'string'},
                                fileFormat: {type: 'string'},
                                numberOfRecords: {type: 'integer'},
                                batchDataLoadDate: {type: 'string'},
                                endBatchDataLoadDate: {type: 'string'},
                                TotalBatchQuality: {type: 'integer'},
                                TotalBatchErrorLevel: {type: 'integer'},
                                lotRejected: {type: 'boolean'},
                                batchRejectedDate: {type: 'integer'},
                                lotApproved: {type: 'boolean'},
                                lotApprovedDate: {type: 'string'},
                                feedback: {type: 'boolean'},
                                feedbackStartDate: {type: 'string'},
                                endDateFeedBack: {type: 'string'},
                                lotDeliveredArea: {type: 'boolean'},
                                lotDeliveryArea: {type: 'string'},
                                lotDeliveredToDataLake: {type: 'boolean'},
                                startDateToDataLake: {type: 'string'},
                                endDateToDataLake: {type: 'string'},
                                receiptLotOrCopy: {type: 'boolean'},
                                dateDownloadedBatchReceiptOrCopy: {type: 'string'},
                                wholeBatchDeleted: {type: 'boolean'},
                                deleteStartDate: {type: 'string'},
                                endDateErased: {type: 'string'},
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
                                    lot: {
                                        type: 'object',
                                        properties: {
                                            operativeId: {type: 'integer'},
                                            lotId: {type: 'integer'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            fileName: {type: 'string'},
                                            fileFormat: {type: 'string'},
                                            numberOfRecords: {type: 'integer'},
                                            batchDataLoadDate: {type: 'string'},
                                            endBatchDataLoadDate: {type: 'string'},
                                            TotalBatchQuality: {type: 'integer'},
                                            TotalBatchErrorLevel: {type: 'integer'},
                                            lotRejected: {type: 'boolean'},
                                            batchRejectedDate: {type: 'integer'},
                                            lotApproved: {type: 'boolean'},
                                            lotApprovedDate: {type: 'string'},
                                            feedback: {type: 'boolean'},
                                            feedbackStartDate: {type: 'string'},
                                            endDateFeedBack: {type: 'string'},
                                            lotDeliveredArea: {type: 'boolean'},
                                            lotDeliveryArea: {type: 'string'},
                                            lotDeliveredToDataLake: {type: 'boolean'},
                                            startDateToDataLake: {type: 'string'},
                                            endDateToDataLake: {type: 'string'},
                                            receiptLotOrCopy: {type: 'boolean'},
                                            dateDownloadedBatchReceiptOrCopy: {type: 'string'},
                                            wholeBatchDeleted: {type: 'boolean'},
                                            deleteStartDate: {type: 'string'},
                                            endDateErased: {type: 'string'},
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
            tags: ['Lots'],
            parameters: [
                {
                    in: 'path',
                    name: 'lotId',
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
            tags: ['Lots'],
            parameters: [
                {
                    in: 'path',
                    name: 'lotId',
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
                                    lot: {
                                        type: 'object',
                                        properties: {
                                            operativeId: {type: 'integer'},
                                            lotId: {type: 'integer'},
                                            description: {type: 'string'},
                                            observation: {type: 'string'},
                                            domain: {type: 'string'},
                                            fileName: {type: 'string'},
                                            fileFormat: {type: 'string'},
                                            numberOfRecords: {type: 'integer'},
                                            batchDataLoadDate: {type: 'string'},
                                            endBatchDataLoadDate: {type: 'string'},
                                            TotalBatchQuality: {type: 'integer'},
                                            TotalBatchErrorLevel: {type: 'integer'},
                                            lotRejected: {type: 'boolean'},
                                            batchRejectedDate: {type: 'integer'},
                                            lotApproved: {type: 'boolean'},
                                            lotApprovedDate: {type: 'string'},
                                            feedback: {type: 'boolean'},
                                            feedbackStartDate: {type: 'string'},
                                            endDateFeedBack: {type: 'string'},
                                            lotDeliveredArea: {type: 'boolean'},
                                            lotDeliveryArea: {type: 'string'},
                                            lotDeliveredToDataLake: {type: 'boolean'},
                                            startDateToDataLake: {type: 'string'},
                                            endDateToDataLake: {type: 'string'},
                                            receiptLotOrCopy: {type: 'boolean'},
                                            dateDownloadedBatchReceiptOrCopy: {type: 'string'},
                                            wholeBatchDeleted: {type: 'boolean'},
                                            deleteStarttDate: {type: 'string'},
                                            endDateErased: {type: 'string'},
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
    }
};
