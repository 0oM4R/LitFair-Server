const router = require('express').Router();
const controller = require('./controller-skills');
router.get('/skill', (req, res) => {
    res.send('skills');
});
router.get('/skills/all', controller.getAll);
router.get('/skills/search', controller.search);
router.post('/skills/newSkill/:skillName', controller.newSkill);

module.exports = router;
