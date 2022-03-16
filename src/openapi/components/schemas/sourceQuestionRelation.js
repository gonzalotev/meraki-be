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
        isRequired: {type: 'boolean'},
        isCodable: {type: 'boolean'},
        isAuxiliary: {type: 'boolean'},
        shouldBeProcessed: {type: 'boolean'},
        souldHaveAuxiliary: {type: 'boolean'},
        shouldReadAutoPhrase: {type: 'boolean'},
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
