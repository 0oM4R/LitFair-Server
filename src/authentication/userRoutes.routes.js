const router = require('express').Router();
const auth = require('../middleware/passport').passport;
const controller = require('./auth.controller');

router.get('/getAll', auth, controller.getAllUsers);
router.post('/addUser', controller.addUser);
router.post('/login', controller.login);

module.exports = router;
