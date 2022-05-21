const {countryModel, citiesModel}= require('./model-location')

const getAllCounters =async(req,res)=>{
    const result = await countryModel.find({}) 
    res.json(result)
}
const searchCountry = async (req, res)=>{
    const country =req.query.country? req.query.country : ""
    const regCountry= new RegExp(`^${country}|. ${country}`,"i")
    const result =  await countryModel.find({"country" :{$regex : regCountry}}).limit(50).sort()
    res.json(result).status(200)
}

const searchCities = async (req, res)=>{
        const country =req.query.country? req.query.country : ""
        const result =  await citiesModel.find({"country":country}).sort()
        res.json(result).status(200)
    }
module.exports = {getAllCounters, searchCountry,searchCities }