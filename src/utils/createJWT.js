require('dotenv').config();
const jwt = require('jsonwebtoken');
const {AUTH_CLIENT_SECRET} = process.env;

const createJWT = (payload, options) => jwt.sign(payload, AUTH_CLIENT_SECRET, options);

module.exports = createJWT;
