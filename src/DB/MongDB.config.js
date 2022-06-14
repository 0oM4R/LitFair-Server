/*******************************MONGODB************************************* */
const mongoose = require('mongoose');
/**
 * @param {string} DB_name - database name
 */
function createConnection(DB_name) {
    try {
        let DB_STRING = process.env.DB_STRING.replace(/DBname/g, DB_name);
        const conn = mongoose.createConnection(DB_STRING);
        return conn;
    } catch (err) {
        console.log(`Connecting to ${DB_name} has been failed`);
    }
}

module.exports = { createConnection };
