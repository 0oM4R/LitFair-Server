const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const Sequelize = require('sequelize');

module.exports = (app) => {
  //Connect Sequelize to database
  try {
    const sequelize = new Sequelize('company_test', 'admin', 'admin123', {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
      define: {
        freezeTableName: true
      }
    });
    //Create All models in data base
    sequelize
      .sync()
      .then((res) => {
        console.log(`Company DB has been connected successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }

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
};
