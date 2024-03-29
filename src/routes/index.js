const {Router} = require('express');
const { authenticate, errorHandler} = require('./middlewares');

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
    return route;
};

class Routes {
    static configure(app) {
        app.use('/', localRoute(Router()));
        Logger.info('Loading public-api...');
        app.use('/api/public', require('./publicApi')(Router()));
        Logger.info('Loading api...');
        app.use('/api', authenticate, require('./api')(Router()));
        app.use(errorHandler);
    }
}

module.exports = Routes;
