module.exports = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        dwellingVisit: {type: 'number'},
        entity: {type: 'string'},
        survey: {type: 'number'},
        response: {type: 'number'},
        user: {
            type: 'object',
            properties: {
                id: {type: 'string'},
                name: {type: 'string'},
                surname: {type: 'string'},
                documentId: {type: 'string'},
                username: {type: 'string'}
            }
        },
        comments: {type: 'string'},
        household: {type: 'number'},
        interrupt: {type: 'number'},
        member: {type: 'number'},
        startDate: {type: 'string'},
        endDate: {type: 'string'}
    }
};
