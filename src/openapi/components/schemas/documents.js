module.exports = {
    type: 'object',
    properties: {
        documentId: {
            type: 'integer'
        },
        documentTypeId: {
            type: 'integer'
        },
        title: {
            type: 'string',
            maxLength: 120
        },
        author: {
            type: 'string',
            maxLength: 120
        },
        institution: {
            type: 'string',
            maxLength: 300,
            nullable: true
        },
        area: {
            type: 'string',
            maxLength: 50,
            nullable: true
        },
        documentDate: {
            type: 'string',
            nullable: true
        },
        isbn: {
            type: 'integer',
            nullable: true
        },
        editorId: {
            type: 'integer'
        },
        fileLocation: {
            type: 'string',
            nullable: true
        },
        summary: {
            type: 'string',
            nullable: true
        },
        url: {
            type: 'string',
            nullable: true
        },
        commentary: {
            type: 'string',
            nullable: true
        },
        numberOfVisits: {
            type: 'integer',
            nullable: true
        },
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        createdAt: {
            type: 'string',
            nullable: false
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
