module.exports = {
    type: 'object',
    properties: {
        sourceId: {type: 'string'},
        questionId: {type: 'string'},
        order: {type: 'string'},
        encodingProcessId: {type: 'string'},
        observation: {type: 'string'},
        domain: {type: 'string'},
        userCreator: {type: 'string'},
        createdAt: {type: 'string'},
        processStartDate: {
            type: 'string',
            format: 'date',
            nullable: true},
        processEndDate: {
            type: 'string',
            format: 'date',
            nullable: true},
        userDeleted: {type: 'string'},
        deletedAt: {type: 'string'}
    }
};
