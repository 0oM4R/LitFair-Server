
const router = require('express').Router();
const auth = require('../middleware/passport').passport;
const controller = require('./auth.controller');
const { googleCallback, googleAuthenticate } = require('../middleware/googleOAuth');
const { googleCallbackAddUser, googleAuthenticateAddUser } = require('../middleware/googleAddUser.js');

router.get('/getAll', auth, controller.getAllUsers);
router.post('/addUser', controller.addUser);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

router.get('/auth/google', googleAuthenticate);
router.get('/google/callback', googleCallback,  controller.login);

router.get('/adduser/google', googleAuthenticateAddUser);
router.get('/google/callback/adduser', googleCallbackAddUser,  controller.addUser);

module.exports = router;