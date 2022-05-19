const {SQL_DB,Sequelize} =require("../../DB/SQL.config")
const User_model = require('../User/model-User').User_model
const phoneValidationRegex = /^[+]\d{9,13}/


const SeekerBaseInfo=SQL_DB.define('Seeker',{
      date_of_birth :{
        type: Sequelize.DATE,
        isDate: {msg: "must be 1960-01-01"},
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
      city:{
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
        // validate:{
        //   validator : (v)=>{
        //     return phoneValidationRegex.test(v)
        //   },
        //   msg: "must be a valid phone number" 
        // },
        
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

SeekerBaseInfo.belongsTo(User_model,{
  foreignKey:"id",
  primaryKey:true,
  onUpdate:"CASCADE",
  onDelete:"CASCADE"
});
SeekerBaseInfo.belongsTo(User_model,{
  foreignKey: "email",
  targetKey: "email",
  onUpdate: "CASCADE",
  onDelete: "RESTRICT"
})

SeekerBaseInfo.sync();


//mongoose schema
const mongoose = require('mongoose')
const schema = mongoose.Schema(
  {
    _id:{
      type: Number, 
      required: [true, '_id field MUST be added manually']
    },
    profile_picture: { 
      type: String
    },
    career_lvl :{ 
      type : String
    },
    jobType: [
      {type: String}
    ],
    jobTitle: [
      {type: String}
    ],
    jobCategory: [
      {type: String}
    ],
    currentState: {
      type: String
    },
    social_links: [
      {
        type: String
      }
    ],
  }
)

let DB_STRING= process.env.DB_STRING.replace(/DBname/g,"seekerInfo")
const conn = mongoose.createConnection(DB_STRING)
const SeekerDetails=conn.model("seeker",schema)


module.exports = {SeekerBaseInfo, SeekerDetails}