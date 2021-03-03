const head = require('lodash/head');
const pick = require('lodash/pick');

const {ArqService} = include('services');
const {buildArchQuery} = include('util');
const {roles: rolesEnum} = include('enums');

class UserController {
    static async login(req, res, next) {
        try {
            const response = await ArqService.login(req.body);
            if (
                response
                && response.user
                && [
                    rolesEnum.NATIONAL_COORDINATOR,
                    rolesEnum.COORDINATOR,
                    rolesEnum.SUB_COORDINATOR
                ].includes(response.user.roles[0])
            ) {
                return res.sendStatus(403);
            }
            return res.send(response);
        } catch (err) {
            next(err);
        }
    }

    static session(req, res, next) {
        try {
            res.send({
                success: true,
                user: req.user
            });
        } catch (err) {
            next(err);
        }
    }

    static async fetchUser(req, res, next) {
        try {
            const archUser = head(await ArqService.fetchUser(req.params.id, req.get('Authorization')));

            if (
                parseInt(archUser.attributes.stateId) === parseInt(req.user.attributes.stateId)
                || req.user.roles[0] === rolesEnum.NATIONAL_COORDINATOR
            ) {
                res.send(archUser);
            }

            return res.sendStatus(403);

        } catch (err) {
            next(err);
        }
    }

    static async fetchUsers(req, res, next) {
        try {
            const token = req.get('Authorization');
            const stateId = req.query.state;
            const role = req.user.roles[0];
            let state;

            if (
                (
                    role === rolesEnum.NATIONAL_COORDINATOR && (!stateId)
                )
            ) {
                state = '';
            }

            const archUsers = await ArqService.fetchUsers(
                buildArchQuery({
                    ...req.query,
                    stateId: state || stateId,
                    getTotals: true
                }, req.user),
                token
            );

            res.send({
                documents: archUsers.users,
                total: archUsers.total
            });

        } catch (err) {
            next(err);
        }
    }

    static async newUser(req, res, next) {
        try {
            const user = pick(
                req.body,
                [
                    'name',
                    'surname',
                    'documentId',
                    'email'
                ]
            );

            const {
                attributes, roles
            } = req.body;

            user.access = {
                attributes,
                roles
            };

            if (
                [
                    rolesEnum.COORDINATOR,
                    rolesEnum.SUB_COORDINATOR
                ].includes(req.user.roles[0])
            ) {
                return res.sendStatus(403);
            }

            const result = await ArqService.postFromArch(req.get('Authorization'), 'users/new', {user});

            if (result.error) {
                return res.status(400).send(result);
            }
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const user = pick(
                req.body,
                [
                    'id',
                    'name',
                    'surname',
                    'documentId',
                    'email'
                ]
            );

            const {
                attributes, roles
            } = req.body;

            user.access = {
                attributes,
                roles,
                assignment: null
            };

            if (
                [
                    rolesEnum.COORDINATOR,
                    rolesEnum.SUB_COORDINATOR
                ].includes(req.user.roles[0])
            ) {
                return res.sendStatus(403);
            }

            await ArqService.putFromArch(req.get('Authorization'), `users/${req.params.id}`, {user});
            res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {

            if (
                [
                    rolesEnum.COORDINATOR,
                    rolesEnum.SUB_COORDINATOR
                ].includes(req.user.roles[0])
            ) {
                return res.sendStatus(403);
            }

            const result = await ArqService.deleteUser(req.params.id, req.get('Authorization'));
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    static async askPasswordRecovery(req, res, next) {
        try {
            const result = await ArqService.askPasswordRecovery(req.body);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    static async validateSession(req, res, next) {
        try {
            const {
                user, success
            } = await ArqService.validateToken(req.body.token);
            res.send({
                success,
                user
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
