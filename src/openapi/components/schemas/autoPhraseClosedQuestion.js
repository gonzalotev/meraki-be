module.exports = {
    type: 'object',
    properties: {
        autoPhraseId: {
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
        abbreviation: {
            type: 'string',
            maxLength: 30
        },
        observation: {
            type: 'string',
            maxLength: 120
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        nomenclatorId: {
            type: 'number',
            nullable: true
        },
        nomenclatureId: {
            type: 'string',
            maxLength: 50,
            nullable: true
        },
        approved: {type: 'boolean'},
        createdAt: {
            type: 'string',
            nullable: true
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
        deletedAt: {
            type: 'string',
            nullable: true
        }
    }
};
