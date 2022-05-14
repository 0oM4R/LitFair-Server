const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');

const validator = require('validator');
const { company_SQLDB, company_MongoDB } = require('../../config/env');

//Connect Sequelize to database
const sequelize = new Sequelize(company_SQLDB, {
  define: {
    freezeTableName: true
  }
});
//Create All models in database
sequelize
  .sync({ alter: true })
  .then((res) => {
    console.log(`Company SQLDB has been connected successfully`);
  })
  .catch((err) => {
    console.log('Can NOT connect to Company SQLDB', err);
  });

//prettier-ignore
const companyProfile = sequelize.define('companyProfile', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING(20) },
  nationality: { type: DataTypes.STRING(20) },
  company_size: { type: DataTypes.INTEGER },
  verified: { type: DataTypes.STRING(20) },
  phone_number: { type: DataTypes.STRING(14) },
  email: { type: DataTypes.STRING(50) },
  title: { type: DataTypes.STRING(280) }
});

//prettier-ignore
const companySchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true, unique: true },
    logo: { type: String },
    CRN: {
      number: { type: String },
      thumbnail: { type: String },
      exp_date: { type: Date }
    },
    description: { type: String },
    social_links: { type: Map, of: String }
  },
  {
    timestamps: true
  }
);

const companyConnection = mongoose.createConnection(company_MongoDB);

module.exports = {
  companyProfile,
  companyInfo: companyConnection.model('CompanyInfo', companySchema)
};
