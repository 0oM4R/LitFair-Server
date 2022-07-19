const Sequelize = require('sequelize');

const { ENV } = require('../config/env');

let SQL_DB;
if (ENV == 'dev') {
    SQL_DB = new Sequelize('litfair', 'root', 'password', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false
    });
} else {
    /**
     * @description SQL_DB instance of connected database.
     */
    SQL_DB = new Sequelize('litfair', 'cupcake', 'password', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false
    });
}

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
    model
        .sync()
        .then((res) => {
            console.log(`> "${model.name}" created successfully`);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = { testConnection, SQL_DB, createTable, Sequelize };
