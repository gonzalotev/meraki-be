const isNil = require('lodash/isNil');
const omitBy = require('lodash/omitBy');
const parseInt = require('lodash/parseInt');
const map = require('lodash/map');
const concat = require('lodash/concat');
const uuid = require('uuidv4').uuid;
const {situations} = include('enums');

const tableName = 'addresses';

class Assignment {
    constructor(knex, name) {
        this.knex = knex;
        this.name = name;
    }

    async getAssignmentsByArea(
        {
            state, ups, area, skip = 0
        }, subCoordinator
    ) {
        const [assignments, assignmentsCount] = await Promise.all([
            this.knex.select('state', 'ups', 'area', 'teamLeader', 'pollster').count('* as dwellings').from(tableName).where(omitBy({
                state,
                ups,
                area,
                subCoordinator
            }, isNil)).groupBy('state').groupBy('ups').groupBy('area').groupBy('teamLeader').groupBy('pollster').orderBy([{
                column: 'state',
                order: 'asc'
            }, {
                column: 'ups',
                order: 'asc'
            }, {
                column: 'area',
                order: 'asc'
            }]).limit(parseInt(process.env.PAGE_SIZE)).offset(skip * parseInt(process.env.PAGE_SIZE)),
            this.knex.count('*').from(this.knex.select('state', 'ups', 'area', 'teamLeader', 'pollster').from(tableName).where(omitBy({
                state,
                ups,
                area,
                subCoordinator
            }, isNil)).groupBy('state').groupBy('ups').groupBy('area').groupBy('teamLeader').groupBy('pollster').as('t1')).as('t2')
        ]);
        return {
            results: assignments.map(assignment => ({
                ...assignment,
                id: uuid()
            })),
            count: assignmentsCount[0].count
        };
    }

    async getAssignmentsBySegment(
        {
            state, ups, area, segment, skip = 0
        }, subCoordinator
    ) {
        const [assignments, assignmentsCount] = await Promise.all([
            this.knex.select('state', 'ups', 'area', 'segment', 'teamLeader', 'pollster').count('* as dwellings').from(tableName).where(omitBy({
                state,
                ups,
                area,
                segment,
                subCoordinator
            }, isNil)).groupBy('state').groupBy('ups').groupBy('area').groupBy('segment').groupBy('teamLeader').groupBy('pollster').orderBy([{
                column: 'state',
                order: 'asc'
            }, {
                column: 'ups',
                order: 'asc'
            }, {
                column: 'area',
                order: 'asc'
            }, {
                column: 'segment',
                order: 'asc'
            }]).limit(parseInt(process.env.PAGE_SIZE)).offset(skip * parseInt(process.env.PAGE_SIZE)),
            this.knex.count('*').from(this.knex.select('state', 'ups', 'area', 'segment', 'teamLeader', 'pollster').from(tableName).where(omitBy({
                state,
                ups,
                area,
                segment,
                subCoordinator
            }, isNil)).groupBy('state').groupBy('ups').groupBy('area').groupBy('segment').groupBy('teamLeader').groupBy('pollster').as('t1')).as('t2').first()
        ]);
        return {
            results: assignments.map(assignment => ({
                ...assignment,
                id: uuid()
            })),
            count: assignmentsCount.count
        };
    }

    async getAssignmentsByUps({
        state, ups, skip = 0
    }, subCoordinator) {
        const [assignments, assignmentsCount] = await Promise.all([
            this.knex.select('state', 'ups', 'subCoordinator')
                .countDistinct('area', {as: 'areas'})
                .count('*', {as: 'dwellings'})
                .from(tableName).where(omitBy({
                    state,
                    ups,
                    subCoordinator
                }, isNil))
                .groupBy('state')
                .groupBy('ups')
                .groupBy('subCoordinator')
                .orderBy([{
                    column: 'state',
                    order: 'asc'
                }, {
                    column: 'ups',
                    order: 'asc'
                }])
                .limit(parseInt(process.env.PAGE_SIZE))
                .offset(skip * parseInt(process.env.PAGE_SIZE)),
            this.knex.count('*').from(this.knex.select('ups', 'subCoordinator').from(tableName).where(omitBy({
                state,
                ups,
                subCoordinator
            }, isNil)).groupBy('ups').groupBy('subCoordinator').as('t1')).as('t2')
        ]);
        return {
            results: assignments.map(assignment => ({
                ...assignment,
                id: uuid()
            })),
            count: assignmentsCount[0].count
        };
    }

    async getAssignmentsByAddress({
        state, ups, area, segment, skip = 0
    }, subCoordinator) {
        const [assignments, assignmentsCount] = await Promise.all([
            this.knex.select('id', 'state', 'ups', 'area', 'segment', 'street', 'room', 'floor', 'department', 'teamLeader', 'pollster', 'listNumber', 'cadastralNumber').from(tableName).where(omitBy({
                state,
                ups,
                area,
                segment,
                subCoordinator
            }, isNil)).orderBy([{
                column: 'state',
                order: 'asc'
            }, {
                column: 'ups',
                order: 'asc'
            }, {
                column: 'area',
                order: 'asc'
            }, {
                column: 'segment',
                order: 'asc'
            }]).limit(parseInt(process.env.PAGE_SIZE)).offset(skip * parseInt(process.env.PAGE_SIZE)),
            this.knex.count('*').from(tableName).where(omitBy({
                state,
                ups,
                area,
                segment,
                subCoordinator
            }, isNil))
        ]);
        return {
            results: assignments,
            count: assignmentsCount[0].count
        };
    }

    async getAddressesToReassign({
        state, ups, area, segment, skip = 0
    }, subCoordinator) {
        const [assignments, assignmentsCount, teamLeaders, pollsters] = await Promise.all([
            this.knex.select('id', 'state', 'ups', 'area', 'segment', 'street', 'room', 'floor', 'department', 'teamLeader', 'pollster', 'listNumber', 'user', 'cadastralNumber', 'situation').from(tableName).where(omitBy({
                state,
                ups,
                area,
                segment,
                subCoordinator
            }, isNil)).whereNotNull('teamLeader').orderBy([{
                column: 'state',
                order: 'asc'
            }, {
                column: 'ups',
                order: 'asc'
            }, {
                column: 'area',
                order: 'asc'
            }, {
                column: 'segment',
                order: 'asc'
            }, {
                column: 'listNumber',
                order: 'asc'
            }]).limit(parseInt(process.env.PAGE_SIZE)).offset(skip * parseInt(process.env.PAGE_SIZE)),
            this.knex.count('*').from(tableName).where(omitBy({
                state,
                ups,
                area,
                segment,
                subCoordinator
            }, isNil)).whereNotNull('teamLeader'),
            this.knex.distinct('teamLeader').from(tableName).where(omitBy({
                state,
                ups,
                area,
                segment,
                subCoordinator
            }, isNil)).whereNotNull('teamLeader'),
            this.knex.distinct('pollster').from(tableName).where(omitBy({
                state,
                ups,
                area,
                segment,
                subCoordinator
            }, isNil)).whereNotNull('pollster')
        ]);
        return {
            results: assignments,
            count: assignmentsCount[0].count,
            usersIds: concat(
                map(pollsters, pollster => pollster.pollster),
                map(teamLeaders, teamLeader => teamLeader.teamLeader)
            )
        };
    }

    assignByArea({
        state,
        ups,
        area,
        teamLeader,
        pollster
    }) {
        return this.knex
            .update({
                pollster,
                teamLeader,
                user: pollster ? pollster : teamLeader,
                situation: situations.ASSIGNED,
                assignDate: new Date()
            })
            .from(tableName)
            .where({
                state,
                ups,
                area
            }).whereNull('teamLeader')
            .timeout(10000);
    }

    assignBySegment({
        state,
        ups,
        area,
        segment,
        teamLeader,
        pollster
    }) {
        return this.knex
            .update({
                pollster,
                teamLeader,
                user: pollster ? pollster : teamLeader,
                situation: situations.ASSIGNED,
                assignDate: new Date()
            })
            .from(tableName)
            .where({
                state,
                ups,
                area,
                segment
            }).whereNull('teamLeader')
            .timeout(10000);
    }

    assignByAddress({
        id, teamLeader, pollster
    }) {
        return this.knex
            .update({
                pollster,
                teamLeader,
                user: pollster ? pollster : teamLeader,
                situation: situations.ASSIGNED,
                assignDate: new Date()
            }).from(tableName)
            .where({id})
            .timeout(10000);
    }

    reassignByAddress({
        id, teamLeader, pollster, user
    }) {
        return this.knex
            .update({
                pollster,
                teamLeader,
                user
            }).from(tableName)
            .where({id})
            .timeout(10000);
    }

    assignSubCoordinator({
        state, ups, subCoordinator
    }) {
        return this.knex
            .update({subCoordinator})
            .from(tableName)
            .where({
                state,
                ups
            })
            .whereNull('subCoordinator')
            .timeout(10000);
    }
}

module.exports = knex => new Assignment(knex, 'Assignment');
