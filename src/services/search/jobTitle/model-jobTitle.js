const mongoose = require('mongoose');
const { createConnection } = require('./../../../DB/MongDB.config');
const conn = createConnection('job_title');

const schema = new mongoose.Schema({ 'job title': String }, { versionKey: false });
const jobTitleModel = conn.model('jobTitle', schema);

module.exports = jobTitleModel;
