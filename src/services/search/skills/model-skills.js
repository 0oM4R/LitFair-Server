const mongoose = require('mongoose');
const schema = new mongoose.Schema({ skill: String }, { versionKey: false });

const { createConnection } = require('../../../DB/MongDB.config');

const conn = createConnection('skills');

const skillsModel = conn.model('skills', schema);

const disconnect = () => {
  const connections = mongoose.connections;
  console.log(connections[connections.indexOf('skills')]);
};
//const skillsModel = conn.model('skills', schema);

// const getall =async()=>{
//     console.log('get all')
//     const sk = await skills.find({"Skills Keys" :{$regex : "^" + "am"}})
//     console.log(sk);
// }
// const search =async(req, res)=>{
//     const result =  await skills.find({"Skills Keys" :{$regex : "^" + req.params.skills}})
// }

module.exports = { skillsModel, disconnect };
