module.exports = {
    type: 'object',
    properties: {
        totalDwelling: {type: 'number'},
        state: {type: 'number'},
        stateName: {type: 'string'},
        unassigned: {type: 'number'},
        assigned: {type: 'number'},
        synchronized: {type: 'number'},
        surveying: {type: 'number'},
        recovering: {type: 'number'},
        supervising: {type: 'number'},
        closed: {type: 'number'},
        finishedInField: {type: 'number'},
        finished: {type: 'number'},
        approved: {type: 'number'}
    }
};
