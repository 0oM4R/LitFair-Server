const nodemailer = require('nodemailer');
const { smtp_host, smtp_port, sendinblue_user, sendinblue_key } = require('../config/env');

exports.smtpMail = async (toEmail, fromName, fromEmail, subject, text) => {
  try {
    let transport = nodemailer.createTransport({
      host: smtp_host,
      port: smtp_port,
      secure: false,
      auth: {
        user: sendinblue_user,
        pass: sendinblue_key,
      },
    });

    let info = await transport.sendMail({
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