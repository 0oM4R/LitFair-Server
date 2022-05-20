
const router = require('express').Router();
const auth = require('../../middleware/passport');
const googleAuth = require('../../middleware/googleOauth')
const controller = require('../User/controller-User');
const controllerSeeker =require('../seeker/controller-seeker').createSeekerProfile


router.get('/getAll', auth.jwtStrategy, controller.getAllUsers);
router.post('/addUser', controller.addUser,controllerSeeker);
router.post('/login', controller.login);
router.delete('/logout', controller.logout);

router.get("/jwtValidate",auth.jwtStrategy, controller.refreshJWT)

router.post('/auth/google', googleAuth.login, controller.googleLogin);
router.get('/google/callback', auth.googleCallback, controller.googleLogin);

router.get('/google/addUser', auth.googleAuthenticateAddUser);
router.get('/google/callback/addUser', auth.googleCallbackAddUser, controller.addUser);

module.exports ={ UserRoutes:router};