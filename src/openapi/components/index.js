const schemas = require('./schemas');

module.exports = {
    parameters: {
        State: {
            in: 'query',
            description: 'State',
            name: 'state',
            schema: {type: 'string'},
            required: true
        },
        Ups: {
            in: 'query',
            description: 'Ups',
            name: 'ups',
            schema: {type: 'number'}
        },
        Area: {
            in: 'query',
            description: 'Area',
            name: 'area',
            schema: {type: 'number'}
        },
        Segment: {
            in: 'query',
            description: 'Segment',
            name: 'segment',
            schema: {type: 'number'}
        },
        Skip: {
            in: 'query',
            description: 'Skip',
            name: 'skip',
            schema: {type: 'number'}
        },
        Status: {
            in: 'query',
            description: 'Status',
            name: 'status',
            schema: {type: 'number'}
        },
        Situation: {
            in: 'query',
            description: 'Situation',
            name: 'situation',
            schema: {type: 'number'}
        },
        TeamLeader: {
            in: 'query',
            description: 'TeamLeader',
            name: 'teamLeader',
            schema: {type: 'string'}
        },
        Pollster: {
            in: 'query',
            description: 'Pollster',
            name: 'pollster',
            schema: {type: 'string'}
        }
    },
    schemas,
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    }
};
