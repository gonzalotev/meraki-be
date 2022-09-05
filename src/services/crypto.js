require('dotenv').config();
const crypto = require('crypto');
const {CRYPT_KEY} = process.env;

const iv = '077NLgyjM9Me3K5d';

class CryptoService {
    constructor(encoding) {
        this.encoding = encoding || 'base64';
    }

    hash(input) {
        return crypto.createHash('sha256').update(input).digest(this.encoding || 'base64');
    }

    encrypt(input) {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.hash(CRYPT_KEY), iv);
        return Buffer.concat([
            cipher.update(input),
            cipher.final()
        ]).toString(this.encoding);
    }

    decrypt(input) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', this.hash(CRYPT_KEY), iv);
        const formattedText = input.replaceAll(' ', '+');
        return Buffer.concat([
            decipher.update(formattedText, this.encoding),
            decipher.final()
        ]).toString();
    }
}

module.exports = CryptoService;
