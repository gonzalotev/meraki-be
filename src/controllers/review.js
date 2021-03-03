const {
    AddressService, ReviewService, ArqService
} = include('services');
const compact = require('lodash/compact');
const uniq = require('lodash/uniq');
const {roles} = include('enums');

class ReviewController {
    static validateState(stateId, user) {
        let subCoordinator;
        let state;
        let hasState = false;
        const role = user.roles[0];
        const userState = user.attributes.stateId;

        if (
            [roles.COORDINATOR, roles.TEAM_LEADER, roles.SUB_COORDINATOR].includes(role)
            && parseInt(stateId) !== parseInt(userState)
        ) {
            if (stateId) {
                hasState = true;
            }
            if (!stateId) {
                state = userState;
            }
            if (roles.SUB_COORDINATOR === role) {
                subCoordinator = user.id;
            }
        }

        return {
            state: state || stateId,
            subCoordinator,
            hasState
        };
    }

    static async getSurveys(req, res, next) {
        try {
            const {
                state,
                subCoordinator,
                hasState
            } = ReviewController.validateState(
                req.query.state,
                req.user
            );

            if (hasState) {
                return res.sendStatus(403);
            }

            const token = req.get('Authorization');
            const {
                surveys, count
            } = await ReviewService.getSurveys({
                ...req.query,
                state,
                subCoordinator
            });

            const ids = uniq(
                compact(
                    surveys.flatMap(survey => [survey.pollster, survey.teamLeader, survey.supervisor, survey.user])
                )
            );

            const users = await ArqService.fetchUsers(ids.length === 1 ? {id: ids} : {ids}, token) || [];

            res.send({
                surveys: surveys.map(survey => ({
                    ...survey,
                    pollster: users.find(user => user.id === survey.pollster),
                    teamLeader: users.find(user => user.id === survey.teamLeader),
                    supervisor: users.find(user => user.id === survey.supervisor),
                    user: users.find(user => user.id === survey.user)
                })),
                count
            });
        } catch (err) {
            next(err);
        }
    }

    static async getSurveyById(req, res, next) {
        try {
            const token = req.get('Authorization');
            const {
                state,
                subCoordinator,
                hasState
            } = await ReviewController.validateState(
                req.query.state,
                req.user
            );

            if (hasState) {
                return res.sendStatus(403);
            }

            const survey = await ReviewService.getSurveyById(
                req.params.id,
                state,
                subCoordinator
            );
            const ids = compact([
                survey.pollster,
                survey.teamLeader,
                survey.supervisor,
                survey.user
            ]);
            if (ids.length > 0) {
                const users = await ArqService.fetchUsers(ids.length === 1 ? {id: ids} : {ids}, token);
                survey.pollster = users.find(user => user.id === survey.pollster);
                survey.teamLeader = users.find(user => user.id === survey.teamLeader);
                survey.supervisor = users.find(user => user.id === survey.supervisor);
                survey.user = users.find(user => user.id === survey.user);
            }

            res.send(survey);
        } catch (err) {
            next(err);
        }
    }

    static async getSurveyData(req, res, next) {
        try {
            res.send(
                await ReviewService.getSurveyData(req.params.id)
            );
        } catch (err) {
            next(err);
        }
    }

    static async finishSurvey(req, res, next) {
        try {
            await ReviewService.finishSurvey(req.params.id);
            return res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static async approveSurvey(req, res, next) {
        try {
            await ReviewService.approveSurvey(req.params.id);
            return res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static findUser(users, id) {
        return users.find(user => user.id === id);
    }

    static async reassignSurvey(req, res, next) {
        try {
            const token = req.get('Authorization');
            const {state} = await AddressService.getData(req.params.id);
            const [user] = await ArqService.fetchUsers({id: req.params.user}, token);

            if (
                parseInt(state) === parseInt(user.attributes.stateId)
                && [roles.TEAM_LEADER, roles.POLLSTER].includes(user.roles[0])
            ) {
                await ReviewService.reassignSurvey(
                    req.params.id,
                    {
                        role: user.roles[0],
                        id: user.id
                    }
                );
                return res.send({success: true});
            }

            return res.sendStatus(403);
        } catch (err) {
            next(err);
        }
    }

    static async reopenSurvey(req, res, next) {
        try {
            const token = req.get('Authorization');
            const {user: userId} = await AddressService.getData(req.params.id);
            const [user] = await ArqService.fetchUsers({id: userId}, token);

            if (
                [
                    roles.TEAM_LEADER,
                    roles.POLLSTER,
                    roles.SUPERVISOR
                ].includes(user.roles[0])
            ) {
                await ReviewService.reopenSurvey(req.params.id, user.roles[0]);
                return res.send({success: true});
            }

            return res.sendStatus(403);
        } catch (err) {
            next(err);
        }
    }

    static async recoverySurvey(req, res, next) {
        try {
            await ReviewService.recoverySurvey(req.params.id);
            return res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static async superviseSurvey(req, res, next) {
        try {
            await ReviewService.superviseSurvey(req.params.id, req.params.user);
            return res.send({success: true});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ReviewController;
