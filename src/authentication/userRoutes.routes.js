
const router = require('express').Router();
const auth = require('../middleware/passport').passport;
const controller = require('./auth.controller');
const { googleCallback, googleAuthenticate } = require('../middleware/googleOAuth');

router.get('/getAll', auth, controller.getAllUsers);
router.post('/addUser', controller.addUser);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

router.get('/auth/google', googleAuthenticate);
router.get('/google/callback', googleCallback, controller.issueJwtGoogle);

module.exports = router;
