const sequelize = require('sequelize');
require('dotenv').config();
const Sequelize = new sequelize('sequelizedb','root','',{
    host: '127.0.0.1',
    dialect:'mysql'
});


const testConnection = async()=>{
    try {
        await Sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

const User =Sequelize.define('user',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
       
         },
    username: {
        type: sequelize.STRING,
    },
    password: {
        type: sequelize.STRING
    }
})

let creatTable = ()=>{
    Sequelize.sync().then(res =>{
        console.log("Connection has been established successfully.")
    }).catch(err =>{
        console.log(err);
    })
}
/*******************************MONGODB************************************* */
const mongoose = require('mongoose')
const TokenSchema = new mongoose.Schema({
    _id: String,
    token: String
})

const  connection =async ()=>{
    return  await mongoose.connect(process.env.DB_STRING)
    .then(
         ()=> console.log('DB connection established')
     );
 };

const tokenModel = mongoose.model('Token', TokenSchema);

module.exports ={creatTable, User, testConnection, connection,tokenModel}