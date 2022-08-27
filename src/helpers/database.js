const knex = require('knex');
const path = require('path');
const {DB_DRIVER, DB_USER, DB_DATABASE, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;
const basePath = `${path.normalize(`${__dirname}/../..`)}`;
const Logger = require(`${basePath}/src/helpers/logger`);

let db;

const connection = {
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT
};

if (DB_DATABASE && DB_DRIVER) {
    db = knex({
        client: DB_DRIVER,
        connection,
        pool: {min: 0, max: 100}
    });
    db.raw('select * from Rol').then(() => {
        process.env.database = 'ok';
        return Logger.info('database connected...');
    }).catch(err => {
        console.error({err});
        process.env.database = 'down';
        Logger.error('database connection failed...');
    });
}

module.exports = db;
