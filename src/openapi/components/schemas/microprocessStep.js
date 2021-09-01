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
            example: 'AA',
            nullable: true
        },
        nomenclatorIdNo: {
            type: 'number',
            nullable: true
        },
        nomenclatureIdNo: {
            type: 'string',
            nullable: true
        },
        listId: {
            type: 'number',
            nullable: true
        },
        questionClosedId: {
            type: 'number',
            nullable: true
        },
        nomenclatorIdYes: {
            type: 'number',
            nullable: true
        },
        nomenclatureIdYes: {
            type: 'string',
            nullable: true
        },
        to: {
            type: 'string',
            example: 'BB',
            nullable: true
        },
        toDestiny: {
            type: 'string',
            nullable: true
        },
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
