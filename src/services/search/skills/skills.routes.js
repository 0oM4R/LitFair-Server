const router = require('express').Router();
const { getAll, search, newSkill } = require('./controller-skills');

router.get('/skills/all', getAll);
router.get('/skills/search', search);
router.post('/skills/newSkill/:skillName', newSkill);

module.exports = router;
