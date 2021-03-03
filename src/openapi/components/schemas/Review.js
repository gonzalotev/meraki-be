module.exports = {
    type: 'object',
    properties: {
        street: {type: 'string'},
        cadastralNumber: {type: 'string'},
        floor: {type: 'string'},
        room: {type: 'string'},
        ups: {type: 'number'},
        area: {type: 'number'},
        fraction: {type: 'number'},
        segment: {type: 'number'},
        teamLeader: {oneOf: [{type: 'object'}, {type: 'string'}]},
        pollster: {oneOf: [{type: 'object'}, {type: 'string'}]},
        supervisor: {oneOf: [{type: 'object'}, {type: 'string'}]},
        syncDate: {
            type: 'string',
            format: 'date-time',
            nullable: true
        },
        user: {oneOf: [{type: 'object'}, {type: 'string'}]},
        address: {type: 'number'},
        state: {type: 'number'},
        stateName: {type: 'string'},
        listNumber: {type: 'number'},
        status: {type: 'number'},
        statusName: {type: 'string'},
        situation: {type: 'number'},
        situationName: {type: 'string'},
        id: {type: 'number'}
    }
};
