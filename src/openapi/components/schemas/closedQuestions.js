module.exports = {
    type: 'object',
    properties: {
        closedQuestionId: {
            type: 'number',
            nullable: false
        },
        sourceId: {
            type: 'number',
            nullable: false
        },
        questionId: {
            type: 'number',
            nullable: false
        },
        description: {
            type: 'string',
            maxLength: 120,
            nullable: false
        },
        observation: {
            type: 'string',
            maxLength: 120
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        operatorId: {
            type: 'string',
            maxLength: 3,
            nullable: false
        },
        plsqlSymbol: {
            type: 'string',
            maxLength: 2
        },
        jsSymbol: {
            type: 'string',
            maxLength: 3
        },
        nomenclatorId: {
            type: 'number',
            nullable: false
        },
        nomenclatureId: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        approved: {
            type: 'boolean'
        },
        createdAt: {
            type: 'string',
            nullable: true
        },
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        nomenclatorEncodeId: {
            type: 'number',
            nullable: false
        },
        nomenclatorAmount: {
            type: 'boolean'
        },
        groupingsAmount: {
            type: 'boolean'
        }
    }
};
