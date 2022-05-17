const router = require('express').Router();
const controller = require('./controller-jobTitle');
router.get('/skill',(req, res) => {
    res.send("skills")
})
router.get('/jobTitle/all', controller.getAll)
router.get('/jobTitle/search',controller.search)
router.post('/jobTitle/newJobTitle/:jobTitleName',controller.newJobTitle)

module.exports ={ JobTitleRoutes:router};