const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SENDINBLUE_USER, SENDINBLUE_KEY } = require('../config/env');

exports.smtpMail = async (toEmail, fromName, fromEmail, subject, text) => {
  try {

    const transport = nodemailer.createTransport({
      host: smtp_host,
      port: smtp_port,
      secure: false,
      auth: {
        user: sendinblue_user,
        pass: sendinblue_key,
      },
    });

    const info = await transport.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: toEmail,
      subject: subject,
      text: text,
      html: `<p>${text}</p>`,
    });
    return info;
  } catch (e) {
    throw e;
  }
};