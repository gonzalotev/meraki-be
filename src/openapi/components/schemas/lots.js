module.exports = {
    type: 'object',
    properties: {
        operativeId: {
            type: 'number',
            nullable: false
        },
        lotId: {
            type: 'number',
            nullable: false
        },
        description: {
            type: 'string',
            nullable: false
        },
        observation: {
            type: 'string',
            nullable: true
        },
        domain: {
            type: 'string',
            nullable: true
        },
        fileName: {
            type: 'string',
            nullable: true
        },
        fileFormat: {
            type: 'string',
            nullable: true
        },
        numberOfRecords: {
            type: 'number',
            nullable: false
        },
        loadDataStartDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        loadDataEndDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        totalLotQuality: {
            type: 'number',
            nullable: true
        },
        totalLotErrorLevel: {
            type: 'number',
            nullable: true
        },
        lotRejected: {type: 'boolean'},
        lotRejectedDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        lotApproved: {type: 'boolean'},
        lotApprovedDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        hasFeedback: {type: 'boolean'},
        feedbackStartDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        feedbackEndDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        hasLotDeliveredToArea: {type: 'boolean'},
        lotDeliveryToAreaDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        hasLotDeliveredToDataLake: {type: 'boolean'},
        dataLakeStartDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        dataLakeEndDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        haslotBackupOrCopy: {type: 'boolean'},
        lotBackupOrCopyDownloadDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        shouldDeleteWholeLot: {type: 'boolean'},
        deleteStartDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        deleteEndDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        createdAt: {
            type: 'string',
            example: '2021-08-20',
            nullable: false
        },
        userCreator: {
            type: 'string',
            nullable: false
        },
        userDeleted: {
            type: 'string',
            nullable: true
        },
        deletedAt: {
            type: 'string',
            example: '2021-08-20',
            nullable: true
        }
    }
};
