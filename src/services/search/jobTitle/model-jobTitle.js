const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 'job title': String }, { versionKey: false });
const { createConnection } = require('./../../../DB/MongDB.config');
const conn = createConnection('job_title');
const jobTitleModel = conn.model('jobTitle', schema);

const disconnect = () => {
    console.log(mongoose.connection.readyState);
    mongoose.connection.close();
    console.log(mongoose.connection.readyState);
};

module.exports = { jobTitleModel, disconnect };
