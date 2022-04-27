const connection= require('../../DB/MongDB.config')
const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 'Skills Keys': String },{ versionKey: false });
const skillsModel = mongoose.model('skills', schema);

// const getall =async()=>{
//     console.log('get all')
//     const sk = await skills.find({"Skills Keys" :{$regex : "^" + "am"}})
//     console.log(sk);
// }
// const search =async(req, res)=>{
//     const result =  await skills.find({"Skills Keys" :{$regex : "^" + req.params.skills}})
// }

module.exports = skillsModel;