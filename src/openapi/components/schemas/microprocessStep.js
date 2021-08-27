module.exports = {
    type: 'object',
    properties: {
        microprocessId: {
            type: 'string',
            example: 'PCXXX'
        },
        order: {
            type: 'number',
            example: 1
        },
        in: {
            type: 'string',
            example: 'AA'
        },
        nomenclatorIdNo: {type: 'string'},
        nomenclatureIdNo: {type: 'number'},
        listId: {type: 'number'},
        questionClosedId: {type: 'number'},
        nomenclatorIdYes: {type: 'number'},
        nomenclatureIdYes: {type: 'string'},
        to: {
            type: 'string',
            example: 'BB'
        },
        toDestiny: {type: 'string'},
        createdAt: {
            type: 'string',
            example: '20-08-2021'
        },
        userCreator: {
            type: 'string',
            example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        }
    }
};
