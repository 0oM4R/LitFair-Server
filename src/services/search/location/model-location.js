
const mongoose = require('mongoose');
const {createConnection} =require('../../../DB/MongDB.config')

const countrySchema = new mongoose.Schema({ 'country': String, "iso3": String },{ versionKey: false });
const citiesSchema = new mongoose.Schema({"city":String, "country":String},{ versionKey: false});
const conn = createConnection("location")
const countryModel=conn.model("country",countrySchema)
const citiesModel=conn.model("cities",citiesSchema)

//const skillsModel = conn.model('skills', schema);

// const getall =async()=>{
//     console.log('get all')
//     const sk = await skills.find({"Skills Keys" :{$regex : "^" + "am"}})
//     console.log(sk);
// }
// const search =async(req, res)=>{
//     const result =  await skills.find({"Skills Keys" :{$regex : "^" + req.params.skills}})
// }

module.exports = {citiesModel, countryModel };