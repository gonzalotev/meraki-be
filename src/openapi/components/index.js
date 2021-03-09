const schemas = require('./schemas');

module.exports = {
    parameters: {
        State: {
            in: 'query',
            description: 'State',
            name: 'state',
            schema: {type: 'string'},
            required: true
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
