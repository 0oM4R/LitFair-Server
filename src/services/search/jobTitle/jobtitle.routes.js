const router = require('express').Router();
const { getAll, search, newJobTitle } = require('./controller-jobTitle');

router.get('/jobTitle/all', getAll);
router.get('/jobTitle/search', search);
router.post('/jobTitle/newJobTitle/:jobTitleName', newJobTitle);

module.exports = router;
