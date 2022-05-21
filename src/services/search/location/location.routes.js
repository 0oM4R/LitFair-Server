const router = require('express').Router();
const controller = require('./controller-location');
router.get('/skill',(req, res) => {
    res.send("skills")
})
router.get('/location/countries',controller.getAllCounters)
router.get('/location/countries/search',controller.searchCountry)
router.get('/location/cities',controller.searchCities)

module.exports ={ locationRoutes:router};