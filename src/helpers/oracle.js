const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
const { DB_CONFIG } = process.env;
const forEach = require('lodash/forEach');

class Oracle {
    constructor() {
        this.connection = null;
    }

    async createConnection() {
        const dbConfig = JSON.parse(DB_CONFIG);
        this.connection = await oracledb.getConnection({
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        });
        return true;
    }

    hasConnection() {
        return !!this.connection;
    }

    async closeConnection(){
        await this.connection.close();
        this.connection = null;
        return true;
    }

    async executePlSql(blockStatement, variables) {
        try {
            await this.createConnection();
            const result = await this.connection.execute(blockStatement, variables);
            await this.closeConnection();
            return result.outBinds;
        } catch (err) {
            return err;
        }
    }

    getFields(fieldsArray) {
        const fieldsObject = {};
        forEach(fieldsArray, field => fieldsObject[field] = { dir: oracledb.BIND_OUT, type: oracledb.DEFAULT });
        return fieldsObject;
    }

    getOutBinds() {
        return {
            varchar: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 120 }
        };
    }
}

module.exports = Oracle;
