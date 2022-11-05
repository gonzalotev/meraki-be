const express = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('./helpers/logger');
const Router = require('./routes');
const packageJson = require('../package.json');

const {BODY_LIMIT, NODE_ENV, PORT} = process.env;

class App {
    _onListening() {
        logger.info(`Started ${packageJson.name} at port ${PORT} in ${NODE_ENV} environment`);
    }

    _onError(err) {
        logger.error(`App Crashed, Error: ${err.errorMessage}`);
        process.exit;
    }

    async init() {
        await this._configure();
        express.listen(PORT, this._onListening);
        express.on('error', this._onError);
    }

    _configure() {
        this._middlewares();
        Router.configure(express);
    }

    _middlewares() {
        express.use(bodyParser.json({limit: BODY_LIMIT}));
        express.use(bodyParser.urlencoded({extended: true}));
        express.use(cookieParser());
        express.use(function (req, res, next){
            logger.info(`${req.method} ${req.url} ${res.statusCode}`);
            next();
        });
        express.use(cors(NODE_ENV === 'development' ? {
            credentials: true,
            origin: /^http:\/\/localhost/
        } : {}));
    }
}

module.exports = App;
