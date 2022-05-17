
const mongoose = require('mongoose');
const schema = new mongoose.Schema({ 'jobTitle': String },{ versionKey: false });
let DB_STRING= process.env.DB_STRING.replace(/DBname/g,"job_title")
const conn = mongoose.createConnection(DB_STRING)
const jobTitleModel=conn.model("jobTitle",schema)

const disconnect = ()=>{
    console.log(mongoose.connection.readyState);
    mongoose.connection.close();
    console.log(mongoose.connection.readyState);
}


module.exports = {jobTitleModel, disconnect };