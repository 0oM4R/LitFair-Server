const mongoose = require('mongoose');
const { createConnection } = require('../../../DB/MongDB.config');
const conn = createConnection('location');

const countrySchema = new mongoose.Schema({ country: String, iso3: String }, { versionKey: false });
const citiesSchema = new mongoose.Schema({ city: String, country: String }, { versionKey: false });

const countryModel = conn.model('country', countrySchema);
const citiesModel = conn.model('cities', citiesSchema);

module.exports = { citiesModel, countryModel };
