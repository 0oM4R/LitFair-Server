const router = require('express').Router();
const { getAll, search, newJobCategory } = require('./controller-jobCategories');
router.get('/skill', (req, res) => {
    res.send('skills');
});
router.get('/jobCategories/all', getAll);
router.get('/jobCategories/search', search);
router.post('/skills/newJobCategories/:skillName', newJobCategory);

module.exports = router;
