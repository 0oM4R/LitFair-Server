const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SENDINBLUE_USER, SENDINBLUE_KEY } = require('../config/env');

exports.smtpMail = async (toEmail, fromName, fromEmail, subject, text) => {
    try {
        const transport = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            auth: {
                user: SENDINBLUE_USER,
                pass: SENDINBLUE_KEY
            }
        });

        const info = await transport.sendMail({
            from: `${fromName} <${fromEmail}>`,
            to: toEmail,
            subject: subject,
            text: text,
            html: `<p>${text}</p> 
      <div>
        <img src="https://res.cloudinary.com/duruvgdtm/image/upload/v1657835890/litfair_media/photos/2022-07-14T21:58:09.967Z-18.gif"  width="300" height="150">
      </div>`
        });
        return info;
    } catch (e) {
        throw e;
    }
};
