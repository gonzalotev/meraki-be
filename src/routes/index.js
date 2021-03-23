const {Router} = require('express');
const get = require('lodash/get');
const { errorHandler} = require('./middlewares');

const {StatusController} = include('controllers');
const Logger = include('helpers/logger');
/**
 * @class Routes
 * links Routes of Application
 * @description
 * <b> /ping </b> returns current version of app </br>
 * <b> /ready </b> Check if everything is ok and running </br>
 * <b> /health </b> Check if external agents are ok </br>
 * <b> /api </b> main link, this manage all functions of be </br>
 * <b> /publicApi </b> Links publics for external and not logging request /br>
 * <b> /swagger </b> Documentation /br>
 * <b> * </b> returns error page when not matching url can be found </br>
 */
const localRoute = route => {
    route.get('/ping', StatusController.ping);
    route.get('/ready', StatusController.getStatus);
    route.get('/health', StatusController.getHealth);
    route.get('/swagger', (_, res) => res.send(get(include('openapi'), 'components')));
    return route;
};

class Routes {
    static configure(app) {
        app.use('/', localRoute(Router()));
        app.use('/api', require('./api')(Router()));
        Logger.info('Loading publicApi...');
        app.use('/publicApi', require('./publicApi')(Router()));
        app.use(errorHandler);
    }
}

module.exports = Routes;
