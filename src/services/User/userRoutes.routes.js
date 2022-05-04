
const router = require('express').Router();
const auth = require('../../middleware/passport');
const controller = require('../User/controller-User');

router.get('/getAll', auth.jwtStrategy, controller.getAllUsers);
router.post('/addUser', controller.addUser);
router.post('/login', controller.login);
router.delete('/logout', controller.logout);

router.get('/google/login', auth.googleAuthenticate);
router.get('/google/callback', auth.googleCallback, controller.googleLogin);

router.get('/google/addUser', auth.googleAuthenticateAddUser);
router.get('/google/callback/addUser', auth.googleCallbackAddUser, controller.addUser);

module.exports ={ UserRoutes:router};