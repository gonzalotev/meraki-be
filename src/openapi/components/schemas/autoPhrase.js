module.exports = {
    type: 'object',
    properties: {
        id: {
            type: 'number',
            nullable: false
        },
        finalPhrase: {
            type: 'string',
            maxLength: 300
        },
        variableId: {
            type: 'string',
            maxLength: 5,
            nullable: false
        },
        canRefeed: {type: 'boolean'},
        refeedDate: {
            type: 'string',
            nullable: true
        },
        parentId: {type: 'number'},
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
