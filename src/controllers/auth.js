require('dotenv').config();
const {AuthService, UserService, CryptoService} = require('../services');
const {validate, validateJWT, createJWT} = require('../utils');

class AuthController {
    static async login(req, res, next) {
        try {
            const missingFields = validate(req.body, ['email', 'password']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: 'Check your data.'});
            }
            const user = await AuthService.login(req.body.email, req.body.password);
            console.log({user});
            if (!user) {
                return res.status(400).send({message: 'Invalid username and/or password.'});
            }
            req.user = user;
            req.session = {authorized: true};
            res.send({success: true, user, token: createJWT(user, {expiresIn: '3d'})});
        } catch (err) {
            next(err);
        }
    }

    static async recoveryPassword(req, res, next) {
        try {
            const missingFields = validate(req.body, ['email', 'answers']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: 'Check your data.'});
            }
            if(req.body.answers.length !== 3) {
                return res.status(400).send({success: false, missingFields, message: 'Check your data.'});
            }
            const user = await UserService.find({Usuario: req.body.email});
            if (!user) {
                return res.status(400).send({ success: false, message: 'Check your data.'});
            }
            //TODO validate req.body.answers with user.answers
            const recoveryToken = createJWT(user, {expiresIn: 10 * 60});
            res.send({success: true, recoveryToken});
        } catch (err) {
            next(err);
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const crypto = new CryptoService();
            const missingFields = validate(req.body, ['password', 'recoveryToken']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: 'Check your data.'});
            }
            const user = validateJWT(req.body.recoveryToken);
            await UserService.update(user.id, {Password: crypto.hash(req.body.password)});
            res.send({success: true});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
