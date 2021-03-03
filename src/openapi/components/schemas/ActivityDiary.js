module.exports = {
    type: 'object',
    properties: {
        hour: {type: 'string'},
        minute: {type: 'string'},
        comment: {type: 'string'},
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    group: {type: 'number'},
                    activity: {type: 'number'},
                    column: {type: 'number'},
                    startTime: {
                        type: 'object',
                        properties: {
                            hour: {type: 'number'},
                            minute: {type: 'number'}
                        }
                    },
                    endTime: {
                        type: 'object',
                        properties: {
                            hour: {type: 'number'},
                            minute: {type: 'number'}
                        }
                    }
                }
            }
        }
    }
};
