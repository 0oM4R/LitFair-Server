const  {SQL_DB, createTable, sequelize} = require("../../DB/SQL.config");

const User_model = SQL_DB.define('User', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
  email: {
    type: sequelize.STRING,
  },
  password: {
    type: sequelize.STRING,
  },
  external_type: {
    type: sequelize.STRING,
    defult : null,
  },
  external_id: {
    type: sequelize.STRING,
    defult : null,
  }
});

//create user table
createTable(User_model);

module.exports = {
  User_model
 };
