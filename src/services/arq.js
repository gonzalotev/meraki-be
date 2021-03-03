const fetch = require('node-fetch');
const {stringify} = require('querystring');
const Errors = include('helpers/error');

const {
    AUTH_ENDPOINT,
    AUTH_CLIENT_ID,
    AUTH
} = process.env;

const OAUTH_API = `${AUTH_ENDPOINT}oauth/`;

class ArqService {
    async login({
        username, password
    }) {
        try {
            const arqResponse = await fetch(
                `${OAUTH_API}login`,
                {
                    method: 'post',
                    body: JSON.stringify(
                        {
                            username,
                            password
                        }
                    ),
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin',
                        clientId: AUTH_CLIENT_ID,
                        redirectUri: AUTH
                    }
                }
            );
            return arqResponse.json();
        } catch (err) {
            throw Error(err);
        }
    }

    async validateToken(bearerToken) {
        try {
            // eslint-disable-next-line
            const token = bearerToken.replace('Bearer ', '');
            const arqResponse = await fetch(
                `${OAUTH_API}token`,
                {
                    method: 'post',
                    body: JSON.stringify({
                        token,
                        grant_type: 'client_credentials'
                    }),
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin',
                        clientId: AUTH_CLIENT_ID
                    }
                }
            );
            return arqResponse.json();
        } catch (err) {
            throw Error(err);
        }
    }

    async getFromArch(token, route, filters) {
        try {
            const routeWithFilters = filters ?
                `${route}?${stringify(filters)}` : route;
            const arqResponse = await fetch(
                `${OAUTH_API}${routeWithFilters}`,
                {
                    method: 'get',
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin',
                        Authorization: token,
                        clientId: AUTH_CLIENT_ID,
                        redirectUri: AUTH
                    }
                }
            );

            return arqResponse.json();
        } catch (err) {
            throw Error(err);
        }
    }

    async postFromArch(token, route, body) {
        try {
            const arqResponse = await fetch(
                `${OAUTH_API}${route}`,
                {
                    method: 'post',
                    body: JSON.stringify(body),
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin',
                        Authorization: token,
                        clientId: AUTH_CLIENT_ID,
                        redirectUri: AUTH
                    }
                }
            );
            return arqResponse.json();
        } catch (err) {
            throw Error(err);
        }
    }

    async putFromArch(token, route, body) {
        try {
            const arqResponse = await fetch(
                `${OAUTH_API}${route}`,
                {
                    method: 'put',
                    body: JSON.stringify(body),
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin',
                        Authorization: token,
                        clientId: AUTH_CLIENT_ID,
                        redirectUri: AUTH
                    }
                }
            );
            return arqResponse.json();
        } catch (err) {
            throw Error(err);
        }
    }

    async deleteFromArch(token, route) {
        try {
            const arqResponse = await fetch(
                `${OAUTH_API}${route}`,
                {
                    method: 'delete',
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin',
                        Authorization: token,
                        clientId: AUTH_CLIENT_ID,
                        redirectUri: AUTH
                    }
                }
            );
            return arqResponse.status === Errors.SUCCESS ? {success: true} : {error: true};
        } catch (err) {
            throw Error(err);
        }
    }

    updateUsersAssignment(users, token) {
        return this.putFromArch(token, 'users', users);
    }

    fetchUsers(filters, token) {
        return this.getFromArch(token, 'users', filters);
    }

    fetchUser(id, token) {
        return this.getFromArch(token, 'users', {id});
    }

    getAppRoles(token) {
        return this.getFromArch(token, 'roles');
    }

    getAppAssignmentType(token) {
        return this.getFromArch(token, 'assignmentType');
    }

    deleteUser(id, token) {
        return this.deleteFromArch(token, `users/${id}`);
    }

    async askPasswordRecovery(user) {
        try {
            const arqResponse = await fetch(
                `${AUTH_ENDPOINT}public-api/passwordRecovery`,
                {
                    method: 'post',
                    body: JSON.stringify(
                        user
                    ),
                    headers: {
                        'content-type': 'application/json',
                        credentials: 'same-origin'
                    }
                }
            );
            return arqResponse.json();
        } catch (err) {
            throw Error(err);
        }

    }
}

module.exports = new ArqService();
