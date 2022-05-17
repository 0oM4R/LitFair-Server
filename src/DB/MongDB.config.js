/*******************************MONGODB************************************* */
const mongoose = require('mongoose')
/**
 * @param {string} DB_name - database name
 */
const  connection =async (DB_name)=>{
   let DB_STRING= process.env.DB_STRING.replace(/DBname/g,DB_name)
    return  await mongoose.connect(DB_STRING)
    .then(
         ()=> console.log('DB connection established')
     );
 };
 
 const createConnection =  (DB_name)=>{
    let DB_STRING= process.env.DB_STRING.replace(/DBname/g,DB_name)
    return  createConnection(DB_STRING);
    
 }

// const tokenModel = mongoose.model('Token', TokenSchema);
module.exports = {connection,createConnection}