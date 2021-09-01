module.exports = {
    type: 'object',
    properties: {
        nomenclatorId: {type: 'number'},
        nomenclatureId: {
            type: 'string',
            maxLength: 50
        },
        autoPhraseId: {type: 'number'},
        observation: {
            type: 'string',
            maxLength: 120
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        approved: {type: 'boolean'},
        createdAt: {
            type: 'string',
            nullable: false
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
