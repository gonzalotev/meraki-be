const head = require('lodash/head');
const pick = require('lodash/pick');
const {ArqService, UserRoleService} = include('services');
const {buildArchQuery} = include('util');

class UserController {
    static async login(req, res, next) {
        try {
            const response = await ArqService.login(req.body);
            if (response && response.user) {
                return res.sendStatus(403);
            }
            return res.send(response);
        } catch (err) {
            next(err);
        }
    }

    static getSession(req, res, next) {
        try {
            res.send({success: true, user: req.user});
        } catch (err) {
            next(err);
        }
    }

    static async fetchUser(req, res, next) {
        try {
            const archUser = head(await ArqService.fetchUser(req.params.id, req.get('Authorization')));
            if (parseInt(archUser.attributes.stateId) === parseInt(req.user.attributes.stateId)) {
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
            const archUsers = await ArqService.fetchUsers(
                buildArchQuery({...req.query, getTotals: true}, req.user),
                token
            );
            res.send(archUsers);
        } catch (err) {
            next(err);
        }
    }

    static async newUser(req, res, next) {
        try {
            const user = pick(req.body, ['name', 'surname', 'documentId', 'email']);
            const {attributes, roles} = req.body;
            user.access = {attributes, roles};
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
            const user = pick(req.body, ['id', 'name', 'surname', 'documentId', 'email']);
            const {attributes, roles} = req.body;
            user.access = {attributes, roles};
            await ArqService.putFromArch(req.get('Authorization'), `users/${req.params.id}`, {user});
            res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {
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
            const {user, success} = await ArqService.validateToken(req.body.token);
            const {role} = await UserRoleService.findOne(user.id);
            user.role = role;
            res.send({success, user});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
