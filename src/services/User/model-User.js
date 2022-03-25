const  {SQL_DB, createTable, Sequelize} = require("../../DB/SQL.config");

const User_model = SQL_DB.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail:{
      msg: 'Please enter a valid email address'}
    }
  },
  password: {
    type: Sequelize.STRING,
  },
  external_type: {
    type: Sequelize.STRING,
    defult : null,
  },
  external_id: {
    type: Sequelize.STRING,
    defult : null,
  }
});

//create user table
createTable(User_model);

module.exports = {
  User_model
 };
