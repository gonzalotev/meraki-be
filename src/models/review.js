const isNil = require('lodash/isNil');
const omitBy = require('lodash/omitBy');

const {
    situations, roles
} = include('enums');

const surveysTable = 'surveys';
const statusesTable = 'statuses';
const addressesTable = 'addresses';
const situationsTable = 'situations';

class Review {
    constructor(knex, name) {
        this.knex = knex;
        this.name = name;
    }

    getSurveysQuery() {
        return this.knex.select(
            'surveys.syncDate',
            'surveys.id as surveyId',
            'addresses.listNumber',
            'addresses.ups',
            'addresses.area',
            'addresses.fraction',
            'addresses.block',
            'addresses.side',
            'addresses.street',
            'addresses.cadastralNumber',
            'addresses.floor',
            'addresses.room',
            'addresses.pollster',
            'addresses.teamLeader',
            'addresses.supervisor',
            'addresses.user',
            'addresses.id',
            'addresses.radius',
            'addresses.state',
            'addresses.stateName',
            'situations.id as situation',
            'situations.label as situationName',
            'situations.status',
            'statuses.label as statusName'
        )
            .from(`${surveysTable} as surveys`)
            .innerJoin(`${addressesTable} as addresses`, 'surveys.address', 'addresses.id')
            .innerJoin(`${situationsTable} as situations`, 'addresses.situation', 'situations.id')
            .innerJoin(`${statusesTable} as statuses`, 'situations.status', 'statuses.id');
    }

    async getSurveys({
        state, ups, area, status, situation, teamLeader, pollster, subCoordinator, skip = 0
    }) {
        const [surveys, surveysCount] = await Promise.all([
            this.getSurveysQuery()
                .where('situations.id', '>', situations.UNASSIGNED)
                .where(omitBy({
                    state,
                    ups,
                    area,
                    'situations.status': status,
                    'situations.id': situation,
                    teamLeader,
                    pollster,
                    subCoordinator
                }, isNil))
                .orderBy([{
                    column: 'addresses.state',
                    order: 'asc'
                }, {
                    column: 'addresses.ups',
                    order: 'asc'
                }, {
                    column: 'addresses.area',
                    order: 'asc'
                }, {
                    column: 'addresses.segment',
                    order: 'asc'
                }]).limit(parseInt(process.env.PAGE_SIZE)).offset(skip * parseInt(process.env.PAGE_SIZE)),
            this.knex.count('*').from(
                this.getSurveysQuery()
                    .where('situations.id', '>', situations.UNASSIGNED)
                    .where(omitBy({
                        state,
                        ups,
                        area,
                        'situations.status': status,
                        'situations.id': situation,
                        teamLeader,
                        pollster,
                        subCoordinator
                    }, isNil))
                    .as('t1')
            ).as('t2')
        ]);
        return {
            surveys,
            count: surveysCount[0].count
        };
    }

    getSurveyById(id, state, subCoordinator) {
        return this.getSurveysQuery()
            .where('addresses.id', '=', id)
            .where('situations.id', '>', situations.UNASSIGNED)
            .where(omitBy({
                state,
                subCoordinator
            }, isNil))
            .first();
    }

    getSurveyData(id) {
        return this.knex.select('data')
            .from(surveysTable)
            .where('address', '=', id)
            .first();
    }

    updateAddressBySituation(situation, whereCondition) {
        return this.knex
            .update({situation}, ['id'])
            .from(addressesTable)
            .where(whereCondition);
    }

    finishSurvey(id) {
        return this.updateAddressBySituation(
            situations.FINISHED_IN_CABINET,
            {
                id,
                situation: situations.FINISHED_IN_FIELD
            }
        ).timeout(10000);
    }

    approveSurvey(id) {
        return this.updateAddressBySituation(
            situations.APPROVED,
            {
                id,
                situation: situations.FINISHED_IN_CABINET
            }
        ).timeout(10000);
    }

    reopenSurvey(
        id,
        rol
    ) {
        const situation = {
            [roles.TEAM_LEADER]: situations.IN_RECOVERY,
            [roles.POLLSTER]: situations.SURVEYING,
            [roles.SUPERVISOR]: situations.IN_SUPERVISION
        };

        return this.updateAddressBySituation(
            situation[rol],
            {id}
        )
            .whereIn('situation', [situations.FINISHED_IN_CABINET, situations.FINISHED_IN_FIELD])
            .timeout(10000);
    }

    reassignSurvey(
        id,
        {
            id: userId,
            role
        }
    ) {
        return this.knex.update({
            user: userId,
            ...(role === roles.TEAM_LEADER
                ? {teamLeader: userId}
                : {pollster: userId}
            ),
            situation: (role === roles.TEAM_LEADER ? situations.IN_RECOVERY : situations.SURVEYING)
        })
            .from(addressesTable)
            .where('id', '=', id)
            .whereIn('situation', [
                situations.SURVEYING,
                situations.IN_RECOVERY,
                situations.IN_SUPERVISION,
                situations.CLOSED
            ])
            .timeout(10000);
    }

    async recoverySurvey(id) {
        const {teamLeader} = await this.knex.select('teamLeader').from(addressesTable).where('id', '=', id).first();

        return this.knex.update({
            situation: situations.IN_RECOVERY,
            user: teamLeader
        })
            .from(addressesTable)
            .where('id', '=', id)
            .where('situation', situations.FINISHED_IN_FIELD)
            .timeout(10000);
    }

    superviseSurvey(
        id, userId
    ) {
        return this.knex.update({
            situation: situations.IN_SUPERVISION,
            user: userId,
            supervisor: userId
        })
            .from(addressesTable)
            .where({id: Number(id)})
            .whereIn('situation', [situations.FINISHED_IN_CABINET, situations.FINISHED_IN_FIELD])
            .timeout(10000);
    }
}

module.exports = knex => new Review(knex, 'Review');
