module.exports = {
    type: 'object',
    properties: {
        operativeId: {
            type: 'integer'
        },
        lotId: {
            type: 'integer'
        },
        description: {
            type: 'string',
            maxLength: 120
        },
        observation: {
            type: 'string',
            maxLength: 120,
            nullable: true
        },
        domain: {
            type: 'string',
            maxLength: 300,
            nullable: true
        },
        fileName: {
            type: 'string',
            maxLength: 50,
            nullable: true
        },
        fileFormat: {
            type: 'string',
            maxLength: 50,
            nullable: true
        },
        numberOfRecords: {
            type: 'integer'
        },
        batchDataLoadDate: {
            type: 'string',
            nullable: true
        },
        endBatchDataLoadDate: {
            type: 'string',
            nullable: true
        },
        TotalBatchQuality: {
            type: 'integer',
            nullable: true
        },
        TotalBatchErrorLevel: {
            type: 'integer',
            nullable: true
        },
        lotRejected: {
            type: 'boolean',
            nullable: true
        },
        batchRejectedDate: {
            type: 'integer',
            nullable: true
        },
        lotApproved: {
            type: 'boolean',
            nullable: true
        },
        lotApprovedDate: {
            type: 'string',
            nullable: true
        },
        feedback: {
            type: 'boolean',
            nullable: true
        },
        feedbackStartDate: {
            type: 'string',
            nullable: true
        },
        endDateFeedBack: {
            type: 'string',
            nullable: true
        },
        lotDeliveredArea: {
            type: 'boolean',
            nullable: true
        },
        lotDeliveryArea: {
            type: 'string',
            nullable: true
        },
        lotDeliveredToDataLake: {
            type: 'boolean',
            nullable: true
        },
        startDateToDataLake: {
            type: 'string',
            nullable: true
        },
        endDateToDataLake: {
            type: 'string',
            nullable: true
        },
        receiptLotOrCopy: {
            type: 'boolean',
            nullable: true
        },
        dateDownloadedBatchReceiptOrCopy: {
            type: 'string',
            nullable: true
        },
        wholeBatchDeleted: {
            type: 'boolean',
            nullable: true
        },
        deleteStartDate: {
            type: 'string',
            nullable: true
        },
        endDateErased: {
            type: 'string',
            nullable: true
        },
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        createdAt: {
            type: 'string',
            format: 'date'
        },
        userDeleted: {
            type: 'string',
            maxLength: 50,
            nullable: true
        },
        deletedAt: {
            type: 'string',
            format: 'date',
            nullable: true
        }
    }
};
