const sequelize = require('sequelize');
require('dotenv').config();

const company = Sequelize.define('company', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.CHAR(20),
  },
  nationality: {
    type: sequelize.CHAR(10),
  },
  company_size: {
    type: sequelize.INTEGER,
  },
  verified: {
    type: sequelize.CHAR(20),
  },
  phone_number:{
      type: sequelize.CHAR(14)
  },
  email: {
      type: sequelize.CHAR(50)
  },
  title: {
      type: sequelize.CHAR(280)
  },
  username_ref:{
      type: sequelize.CHAR(9)
  }
});

let creatTable = () => {
  Sequelize.sync()
    .then((res) => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = {
    creatTable,
    company
}