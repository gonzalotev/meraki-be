const knex = require('knex');
const path = require('path');
const {DB_DRIVER, DB_CONFIG} = process.env;
const basePath = `${path.normalize(`${__dirname}/../..`)}`;
const Logger = require(`${basePath}/src/helpers/logger`);

let db;

if (DB_CONFIG && DB_DRIVER) {
    db = knex({
        client: DB_DRIVER,
        connection: JSON.parse(DB_CONFIG),
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
