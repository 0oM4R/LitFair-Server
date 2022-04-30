const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { job_DB } = require('../../config/env');
const routes = require('./routes');

const jobService = (app) => {
  
  //Connect mongoose to database
    mongoose
      .connect(job_DB)
      .then(() => {
        console.log(`Jobs DB has been connected successfully`);
      })
      .catch((err) => {
        console.log('Can NOT connect to Jobs DB', err);
      });

  app.use(
    cors({
      origin: true,
      credentials: true
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  //Routers
  app.use(morgan('dev'));
  app.use(routes);
};

//Create Application
const app = express();
jobService(app);

const port = 5051;
app.listen(port, () => {
  console.log(`Job Service connected successfully ON port-${port}`);
});
module.exports = jobService;
