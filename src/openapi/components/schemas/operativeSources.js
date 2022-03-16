module.exports = {
    type: 'object',
    properties: {
        sourceId: {
            type: 'number',
            nullable: false
        },
        name: {
            type: 'string',
            nullable: false
        },
        initial: {
            type: 'string',
            nullable: false
        },
        operativeTypeId: {
            type: 'number',
            nullable: false
        },
        frequencyId: {
            type: 'number',
            nullable: false
        },
        supportId: {
            type: 'number',
            nullable: false
        },
        dateFrom: {
            type: 'string',
            nullable: false,
            example: '2021-08-20'
        },
        dateTo: {
            type: 'string',
            nullable: true,
            example: '2021-08-20'
        },
        observation: {
            type: 'string',
            nullable: true
        },
        domain: {
            type: 'string',
            nullable: true
        },
        supervised: {type: 'boolean'},
        createdAt: {
            type: 'string',
            example: '2021-08-20',
            nullable: false
        },
        userCreator: {
            type: 'string',
            nullable: false
        }
    }
};
