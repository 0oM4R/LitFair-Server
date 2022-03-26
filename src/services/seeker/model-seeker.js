const {SQL_DB, createTable,Sequelize} =require("../../DB/SQL.config")
const User_model = require('../User/model-User').User_model

const phoneValidationRegex = /^[+]\d{9,13}/


const Seeker =SQL_DB.define('Seeker',{
      
      dat_of_birth :{
        type: Sequelize.DATE,
        isDate: true,
        isAfter: "1960-01-01",
        isBefore: "2010-01-01",
        allowNull: true
      },
      fname :{
        type: Sequelize.STRING(50),
        isAlpha: {msg: "must be alpha"}
      },
      lname :{
        type: Sequelize.STRING(50),
        isAlpha: {msg: "must be alpha"},
    
        allowNull: true
      },
      nationality: {
        type :Sequelize.STRING(50),
        isAlpha: {msg: "must be alpha"},
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(50),
        isAlpha: {msg: "must be alpha"},
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING(6),
        isAlpha: {msg: "must be alpha"},
        allowNull: true
      },
      phone_number:{
        type: Sequelize.INTEGER(15),
        validate:{
          validator : (v)=>{
            return phoneValidationRegex.test(v)
          },
          msg: "must be a valid phone number" 
        },
        
        allowNull: true
    },
      title:{
        type: Sequelize.TEXT,
        allowNull: true
      }
},
{
  timestamps: false
})

Seeker.belongsTo(User_model,{
  foreignKey:"id",
  primaryKey:true,
  onUpdate:"CASCADE",
  onDelete:"CASCADE"
});
Seeker.belongsTo(User_model,{
  foreignKey: "email",
  targetKey: "email",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT"
})
createTable(Seeker);

module.exports = {Seeker}