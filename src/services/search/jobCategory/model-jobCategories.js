const mongoose = require('mongoose');
const { createConnection } = require('./../../../DB/MongDB.config');
const conn = createConnection('jobCategories');

const schema = new mongoose.Schema({ jobCategories: String }, { versionKey: false });
const jobCategoriesModel = conn.model('jobCategories', schema);

module.exports = jobCategoriesModel;
