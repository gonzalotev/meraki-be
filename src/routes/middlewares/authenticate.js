/* eslint-disable */
const {UserService} = include('services');

const logger = require('../../helpers/logger');

module.exports = async (req, res, next) => {
    const header = req.get('Authorization');
    if (!header) {
        return res.send(401).send({message: 'error token', code: 401});
    }
    try {
        const token = header.replace('Bearer ', '');
        const {success, user} = await UserService.validateToken(token);
        if (!success || user.deleted) {
            return res.status(401).send({message: "unauthorized", code: 401});
        }
        req.user = user;
        logger.info(user._id);
        next();
    } catch (err) {
        res.status(401).send({message: err.message, code: 401});
    }
};
