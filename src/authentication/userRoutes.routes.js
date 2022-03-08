const router = require('express').Router();
const passport = require('passport');
// Pass the global passport object into the configuration function
require('../middleware/passport')(passport);
// This will initialize the passport object on every request
router.use(passport.initialize());
const authController = require('./auth.controller');
router.get('/getAll',passport.authenticate('jwt',{session: false}),  authController.getAllUsers );
router.post('/addUser', authController.addUser );
router.post('/login',  authController.login );
module.exports = router ;