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
        variableId: {
            type: 'string',
            maxLength: 5,
            nullable: false
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
        isCodable: {type: 'boolean'},
        shouldBeProcessed: {type: 'boolean'},
        observation: {
            type: 'string',
            maxLength: 120
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        createdAt: {
            type: 'string',
            nullable: true
        }
    }
};
