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
            nullable: true
        },
        encodingEndDate: {
            type: 'string',
            nullable: true
        },
        deliveryStartDate: {
            type: 'string',
            nullable: true
        },
        eraseStartDate: {
            type: 'string',
            nullable: true
        },
        eraseEndDate: {
            type: 'string',
            nullable: true
        },
        totalQuality: {type: 'integer'},
        errorLevel: {type: 'number'},
        userId: {type: 'string'},
        createdAt: {
            type: 'string',
            nullable: true
        }
    }
};
