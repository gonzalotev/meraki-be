module.exports = {
    type: 'object',
    properties: {
        id: {type: 'number'},
        street: {type: 'string'},
        cadastralNumber: {type: 'string'},
        floor: {type: 'string'},
        room: {type: 'string'},
        department: {type: 'string'},
        teamLeader: {type: 'string'},
        pollster: {type: 'string'},
        radius: {type: 'number'},
        user: {oneOf: [{type: 'object'}, {type: 'string'}]},
        role: {type: 'string'},
        situation: {type: 'number'}
    }
};
