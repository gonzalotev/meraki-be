const isEmpty = require('lodash/isEmpty');
const parseInt = require('lodash/parseInt');
const moment = require('moment');

const tableName = 'logs';

class Log {
    constructor(knex, name) {
        this.knex = knex;
        this.name = name;
    }

    async getLogs(
        users, {
            term, state, role, fromDate, toDate, skip = 0
        }
    ) {
        if (
            (!isEmpty(term) || !isEmpty(state) || !isEmpty(role)) && users.length === 0) {
            return {
                logs: [],
                count: 0
            };
        }
        const query = this.knex.select( 'user',
            'syncDate',
            'loginDate',
            'version',
            'id'
        ).from(tableName);

        if (fromDate) {
            query.whereRaw('??::date >= ? ', ['syncDate', moment(fromDate).format('YYYY-MM-DD')]);
        }
        if (toDate) {
            query.whereRaw('??::date <= ? ', ['syncDate', moment(toDate).format('YYYY-MM-DD')]);
        }
        if (users.length > 0) {
            query.whereIn('user', users.map(user => user.id));
        }

        const [logs, logsCount] = await Promise.all([
            query
                .limit(parseInt(process.env.PAGE_SIZE))
                .offset(skip * parseInt(process.env.PAGE_SIZE)),
            this.knex.count('*').from(query.as('t1')).as('t2')
        ]);

        return {
            logs: logs.map(log => ({
                ...log,
                user: users.find(user => user.id === log.user)
            })),
            count: logsCount[0].count
        };
    }
}

module.exports = knex => new Log(knex, 'Log');
