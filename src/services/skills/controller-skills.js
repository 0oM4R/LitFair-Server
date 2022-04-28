const skillsModel = require('./model-skills')
const connection = require('../../DB/MongDB.config');
connection()
const getall =async(req,res)=>{
    console.log('get all')
    const result = await skillsModel.find({})
    result.forEach(async (e,i)=>{
        result[i]["Skills Keys"]=e["Skills Keys"].toLowerCase();
        await result[i].save()
        
        
    })   
    res.json(result)
}
const search =async(req, res)=>{
    const skill =req.query.skill? req.query.skill.toLowerCase() : ""
    
    const result =  await skillsModel.find({"Skills Keys" :{$regex : "(^)( *)(^)" + skill}}).limit(20)
    result.forEach(async (e,i)=>{
        result[i]["Skills Keys"]=e["Skills Keys"].toLowerCase();
        await result[i].save()
        
        
    })   
    res.json(result)
}
const newSkill = async (req, res)=>{
    const skill = new skillsModel({'Skills Keys': req.params.skillName})
    await skill.save();
    res.send(skill);
}
module.exports = {getall, search, newSkill}