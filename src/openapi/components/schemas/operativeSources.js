module.exports = {
    type: 'object',
    properties: {
        sourceId: {type: 'string'},
        name: {type: 'string'},
        initial: {type: 'string'},
        operativeTypeId: {type: 'string'},
        frequencyId: {type: 'string'},
        supportId: {type: 'string'},
        dateFrom: {
            type: 'string',
            nullable: true},
        dateTo: {
            type: 'string',
            nullable: true},
        observation: {type: 'string'},
        domain: {type: 'string'}
    }
};
