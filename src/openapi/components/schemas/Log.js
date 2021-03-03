module.exports = {
    type: 'object',
    properties: {
        user: {type: 'object'},
        syncDate: {
            type: 'string',
            format: 'date-time'
        },
        loginDate: {
            type: 'string',
            format: 'date-time'
        },
        version: {type: 'string'},
        id: {type: 'number'}
    }
};
