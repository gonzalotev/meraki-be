const isNil = require('lodash/isNil');
const omitBy = require('lodash/omitBy');
const moment = require('moment');

class Monitoring {
    constructor(knex, name) {
        this.knex = knex;
        this.name = name;
    }

    getMonitoring({
        state, fromDate, toDate
    }) {
        const monitoring = this.knex
            .select('state', 'stateName', this.knex.raw(`
            count(*) as dwellings,
            sum(case when situation = 1 then 1 else 0 end) as unassigned,
            sum(case when situation = 2 then 1 else 0 end) as assigned,
            sum(case when situation = 3 then 1 else 0 end) as synced,
            sum(case when situation = 4 then 1 else 0 end) as surveying,
            sum(case when situation = 5 then 1 else 0 end) as recovering,
            sum(case when situation = 6 then 1 else 0 end) as supervising,
            sum(case when situation = 7 then 1 else 0 end) as closed,
            sum(case when situation = 8 then 1 else 0 end) as finished_in_field,
            sum(case when situation = 9 then 1 else 0 end) as finished_in_cabinet,
            sum(case when situation = 10 then 1 else 0 end) as approved`
            ))
            .from('addresses')
            .where(omitBy({state}, isNil))
            .groupBy('state', 'stateName');
        if (fromDate) {
            monitoring.whereRaw('??::date >= ? ', ['assignDate', moment(fromDate).format('YYYY-MM-DD')]);
        }
        if (toDate) {
            monitoring.whereRaw('??::date <= ? ', ['assignDate', moment(toDate).format('YYYY-MM-DD')]);
        }
        return monitoring;
    }
}

module.exports = knex => new Monitoring(knex, 'Monitoring');
