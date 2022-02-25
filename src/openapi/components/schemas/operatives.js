module.exports = {
    type: 'object',
    properties: {
        operativeId: {
            type: 'integer',
            nullable: false
        },
        sourceId: {
            type: 'integer',
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
        arrivalDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        mailContact: {
            type: 'string',
            example: 'xxxxxxx@ggggg.com',
            nullable: true
        },
        operatingContact: {
            type: 'string',
            nullable: true
        },
        totalRecords: {
            type: 'integer',
            nullable: true
        },
        deliveryStartDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        codingStartDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        codingEndDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        deletedStartDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        deletedEndDate: {
            type: 'string',
            example: '2022-02-16T20:22:02',
            nullable: true
        },
        operatingErrorLevel: {
            type: 'number',
            nullable: true
        },
        qualityOperational: {
            type: 'number',
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
