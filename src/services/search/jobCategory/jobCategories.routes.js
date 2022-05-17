const router = require('express').Router();
const controller = require('./controller-jobCategories');
router.get('/skill',(req, res) => {
    res.send("skills")
})
router.get('/jobCategories/all', controller.getAll)
router.get('/jobCategories/search',controller.search)
router.post('/skills/newJobCategories/:skillName',controller.newJobCategory)

module.exports ={ JobCategoriesRoutes:router};