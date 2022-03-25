const Sequelize = require('sequelize');

require('dotenv').config();

/**
 * @description SQL_DB instance of connected database.
 */
const SQL_DB = new Sequelize('sequelizedb', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false,
});

const testConnection = async () => {
    try {
      await SQL_DB.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
/**
 * @param {String} model model to be created
 */
let createTable = (model) => {
    model.sync()
      .then((res) => {
        console.log(`> "${model.name}" created successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  };


module.exports ={ testConnection ,SQL_DB ,createTable,Sequelize}