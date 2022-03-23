
const router = require('express').Router();
const auth = require('../middleware/passport');
const controller = require('./auth.controller');

router.get('/getAll', auth.jwtStrategy, controller.getAllUsers);
router.post('/addUser', controller.addUser);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

router.get('/auth/google', auth.googleAuthenticate);
router.get('/google/callback', auth.googleCallback, controller.login);

router.get('/adduser/google', auth.googleAuthenticateAddUser);
router.get('/google/callback/adduser', auth.googleCallbackAddUser, controller.addUser);

module.exports = router;