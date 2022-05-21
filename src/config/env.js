require('dotenv').config();

module.exports = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  company_SQLDB: process.env.company_SQLDB,
  company_MongoDB: process.env.company_MongoDB,
  job_DB: process.env.job_DB,
  seeker_DB: process.env.seeker_DB,

  //clouninary
  // cloudinary_name,
  // cloudinary_api_key,
  // cloudinary_api_secret

  workspace: process.env.workspace
};
