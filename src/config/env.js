require('dotenv').config();

module.exports = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  company_DB: process.env.company_DB,
  job_DB: process.env.job_DB,
  seeker_DB: process.env.seeker_DB

  //clouninary
  // cloudinary_name,
  // cloudinary_api_key,
  // cloudinary_api_secret
};
