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

const companyProfile = sequelize.define('companyProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    set(v) {
      const storedValue = this.getDataValue('username');
      this.setDataValue('username', storedValue.split('@')[0]);
    }
  },
  name: {
    type: DataTypes.STRING(20)
  },
  nationality: {
    type: DataTypes.STRING(10)
  },
  company_size: {
    type: DataTypes.INTEGER
  },
  verified: {
    type: DataTypes.STRING(20)
  },
  phone_number: {
    type: DataTypes.STRING(14)
  },
  email: {
    type: DataTypes.STRING(50)
  },
  title: {
    type: DataTypes.STRING(280)
  }
});

//Connect mongoose to database
mongoose
.connect(company_MongoDB)
.then(() => {
  console.log(`Company MongoDB has been connected successfully`);
})
.catch((err) => {
  console.log('Can NOT connect to Company MongoDB', err);
});

const companySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    logo: { type: String },
    CRN: {
      number: { type: String },
      thumbnail: { type: String },
      expDate: { type: Date }
    },
    description: { type: String },
    social_links: { type: Map, of: String }
  },
  {
    timestamps: true
  }
);

module.exports = {
  companyProfile,
  companyInfo: mongoose.model('CompanyInfo', companySchema)
};
