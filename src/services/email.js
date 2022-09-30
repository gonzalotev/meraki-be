require('dotenv').config();
const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_SMTP, EMAIL_PORT } = process.env;
const nodemailer = require('nodemailer');

class EmailService {
    static createTransporter = () => {
        return nodemailer.createTransport({
            logger: true,
            debug: true,
            host: EMAIL_SMTP,
            port: EMAIL_PORT,
            secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD
            }
        });
    };

    static sendMail(to, subject, message) {
        const transporter = this.createTransporter();
        const mailOptions = {
            from: EMAIL_USER,
            to: to,
            subject: subject,
            html: `${message}<br/><br/><small>Por favor no responder este mensaje.</small>`
        };
        return transporter.sendMail(mailOptions);
    }
}

module.exports = EmailService;
