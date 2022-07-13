require('dotenv').config();

module.exports = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    company_SQLDB: process.env.company_SQLDB,
    company_MongoDB: process.env.company_MongoDB,
    job_DB: process.env.job_DB,
    seeker_DB: process.env.seeker_DB,

    // clouninary
    cloudinary_name: process.env.cloudinary_name,
    cloudinary_api_key: process.env.cloudinary_api_key,
    cloudinary_api_secret: process.env.cloudinary_api_secret,

    // rabbitMQ
    MQ_URL: process.env.MQ_URL,
    PUBLISH_VIDEOMQ_NAME: process.env.PUBLISH_VIDEOMQ_NAME,
    CONSUME_VIDEOMQ_NAME: process.env.CONSUME_VIDEOMQ_NAME,

    //smtp_api
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SENDINBLUE_USER: process.env.SENDINBLUE_USER,
    SENDINBLUE_KEY: process.env.SENDINBLUE_KEY,
    workspace: process.env.workspace
};
