const {SQL_DB, createTable,Sequelize} =require("../../DB/SQL.config")
const User_model = require('../User/model-User').User_model

const phoneValidationRegex = /^[+]\d{9,13}/

const Seeker =SQL_DB.define('Seeker',{
      
      dat_of_birth :{
        type: Sequelize.DATE,
        isDate: true,
        isAfter: "1960-01-01",
        isBefore: "2010-01-01"
      },
      fname :{
        type: Sequelize.STRING(50),
        isAlpha: {msg: "must be alpha"}
      },
      lname :{
        type: Sequelize.STRING(50),
        isAlpha: {msg: "must be alpha"} 
      },
      nationality: {
        type :Sequelize.STRING(50),
        isAlpha: {msg: "must be alpha"}
      },
      country: {
        type: Sequelize.STRING(50),
        isAlpha: {msg: "must be alpha"}
      },
      gender: {
        type: Sequelize.STRING(6),
        isAlpha: {msg: "must be alpha"}
      },
      phone_number:{
        type: Sequelize.INTEGER(15),
        validate:{
          validator : (v)=>{
            return phoneValidationRegex.test(v)
          },
          msg: "must be a valid phone number" 
        }
    },
      email :{
        type: Sequelize.STRING(50),
        isEmail: true
      },
      title:{
        type: Sequelize.TEXT
      }
},
{
  timestamps: false
})

Seeker.belongsTo(User_model,{foreignKey:"id",primaryKey:true});
createTable(Seeker);

module.exports = {Seeker}