require('dotenv').config();
const {AuthService, UserService, CryptoService, EmailService} = require('../services');
const {validate, validateJWT, createJWT} = require('../utils');
const {URL_CLIENT} = process.env;

class AuthController {
    static async login(req, res, next) {
        try {
            const missingFields = validate(req.body, ['email', 'password']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: 'Check your data.'});
            }
            const user = await AuthService.login(req.body.email, req.body.password);
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
            const missingFields = validate(req.body, ['email']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: 'Check your data.'});
            }
            const user = await UserService.find({Usuario: req.body.email});
            if (!user) {
                return res.status(400).send({ success: false, message: 'Check your data.'});
            }
            const token = createJWT(user, {expiresIn: 10 * 60});
            const response = await EmailService.sendMail(
                req.body.email,
                'Recuperar clave - Meraki',
                `<p>Hola! ${user.email},</p><p>Bienvenido a <strong>Meraki</strong>.</p></br><p><a href="${URL_CLIENT}Reset?token=${token}" target="_blank" rel="noopener noreferrer">Click here</a> para recuperar la clave.</p></br>`
            );
            if (response.error) {
                return res.status(500).send({success: false, message: 'An error occurred sending the mail.'});
            }
            res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const crypto = new CryptoService();
            const missingFields = validate(req.body, ['password', 'token']);
            if(missingFields.length) {
                return res.status(400).send({success: false, missingFields, message: 'Check your data.'});
            }
            const user = validateJWT(req.body.token);
            console.log({user});
            await UserService.update(user.id, {Password: crypto.hash(req.body.password)});
            res.send({success: true});
        } catch (err) {
            next(err);
        }
    }

    static getSessionUser(req, res, next) {
        try {
            res.send({success: true, user: req.user, token: req.token});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
