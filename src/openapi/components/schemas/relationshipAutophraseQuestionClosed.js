module.exports = {
    type: 'object',
    properties: {
        sourceId: {
            type: 'number',
            nullable: false
        },
        questionId: {
            type: 'number',
            nullable: false
        },
        questionCode: {
            type: 'string',
            maxLength: 12
        },
        nomenclatorId: {
            type: 'number',
            nullable: true
        },
        questionTypeId: {
            type: 'string',
            maxLength: 1,
            nullable: false
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        userDeleted: {
            type: 'string',
            maxLength: 50,
            nullable: true
        },
        createdAt: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        deletedAt: {
            type: 'string',
            format: 'date',
            nullable: true
        }
    }
};
