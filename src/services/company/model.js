const sequelize = require('sequelize');
const mongoose = require('mongoose');

const companyProfile = Sequelize.define('companyProfile', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: sequelize.STRING,
    allowNull: false,
    set(v) {
      const storedValue = this.getDataValue('username');
      this.setDataValue('username', storedValue.split('@')[0]);
    }
  },
  name: {
    type: sequelize.CHAR(20)
  },
  nationality: {
    type: sequelize.CHAR(10)
  },
  company_size: {
    type: sequelize.INTEGER
  },
  verified: {
    type: sequelize.CHAR(20)
  },
  phone_number: {
    type: sequelize.CHAR(14)
  },
  email: {
    type: sequelize.CHAR(50)
  },
  title: {
    type: sequelize.CHAR(280)
  }
});

const companySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      set: (v) => v.split('@')[0]
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
    timestamps: {
      createdAt,
      updatedAt
    }
  }
);

module.exports = {
  companyProfile,
  companyInfo: mongoose.model('CompanyInfo', companySchema)
};
