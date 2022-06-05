const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');

const validator = require('validator');
const { company_SQLDB, company_MongoDB } = require('../../config/env');

//Connect Sequelize to database
// const sequelize = new Sequelize(company_SQLDB, {
//   define: {
//     freezeTableName: true
//   }
// });

const sequelize = new Sequelize('sequelizedb', 'Dev', 'LitFair2022#', {
  host: 'sequelizedb.cbbhykvzmbuz.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

//Create All models in database
sequelize
  .sync({ alter: true })
  .then((res) => {
    console.log(`Company_Sqldb has been connected`);
  })
  .catch((err) => {
    console.log('Can NOT connect to Company SQL_DB', err);
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
    _id: { type: Number, required: true,},
    logo: { type: String },
    social: { type: Map, of: String },
    CRN: {
      number: { type: String },
      thumbnail: { type: String },
      exp_date: { type: Date }
    },
    description: { type: String },
  },
  {
    timestamps: true
  }
);

companySchema.virtual('posted_job', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'company_id'
});

const companyConnection = (() => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized'
  };
  const conn = mongoose.createConnection(company_MongoDB);
  console.log(`Company_Mongodb has been ${states[conn.readyState]}`);
  return conn;
})();

module.exports = {
  companyProfile,
  companyInfo: companyConnection.model('CompanyInfo', companySchema)
};
