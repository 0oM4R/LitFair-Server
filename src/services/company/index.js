const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes');

const companyService = (app) => {
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
companyService(app);

const port = 5052;
app.listen(port, () => {
  console.log(`Job Service connected successfully ON port-${port}`);
});

module.exports = companyService;
