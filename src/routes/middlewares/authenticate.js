/* eslint-disable */
const {AuthService} = include('services');

const logger = require('../../helpers/logger');

module.exports = async (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        return res.status(403).send({message: 'error token', code: 401});
    }
    try {
        const token = header.replace('Bearer ', '');
        const {success, user} = await AuthService.validateToken(token);
        if (!success || user.deleted) {
            return res.status(403).send({message: "unauthorized", code: 401});
        }
        req.user = user;
        req.token = token;
        if(user) {
            logger.info(user.email);
        }
        next();
    } catch (err) {
        res.status(403).send({message: err.message, code: 401});
    }
};
