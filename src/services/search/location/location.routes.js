const router = require('express').Router();
const { getAllCounters, searchCountry, searchCities } = require('./controller-location');

router.get('/location/countries', getAllCounters);
router.get('/location/countries/search', searchCountry);
router.get('/location/cities', searchCities);

module.exports = router;
