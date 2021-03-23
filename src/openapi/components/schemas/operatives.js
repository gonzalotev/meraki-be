module.exports = {
    type: 'object',
    properties: {
        id: { type: 'integer'},
        sourceId: {type: 'integer'},
        description: {type: 'string'},
        observation: {
            type: 'string',
            nullable: true
        },
        domain: {
            type: 'string',
            nullable: true
        },
        dateArrival: {
            type: 'string',
            nullable: true
        },
        totalRecords: {type: 'integer'},
        contact: {type: 'string'},
        contactEmail: {type: 'string'},
        encodingStartDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        encodingEndDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        deliveryStartDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        eraseStartDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        eraseEndDate: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        totalQuality: {type: 'integer'},
        errorLevel: {type: 'number'},
        userId: {type: 'string'},
        createdAt: {
            type: 'string',
            format: 'date',
            nullable: true
        }
    }
};
