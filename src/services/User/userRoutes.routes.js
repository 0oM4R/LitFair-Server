const router = require('express').Router();
const { jwtStrategy, googleCallback, googleCallbackAddUser, googleAuthenticateAddUser } = require('../../middleware/passport');
const loginGoogle = require('../../middleware/googleOauth');
const { getAllUsers, addUser, login, logout, refreshJWT, googleLogin, changePassword } = require('../User/controller-User');

router.post('/addUser', addUser);
router.post('/login', login);
router.delete('/logout', logout);

router.get('/getAll', jwtStrategy, getAllUsers);
router.get('/jwtValidate', jwtStrategy, refreshJWT);
router.put('/user/changePassword', jwtStrategy, changePassword);

// router.post('/auth/google', loginGoogle, googleLogin);
// router.get('/google/callback', googleCallback, googleLogin);
// router.get('/google/addUser', googleAuthenticateAddUser);
// router.get('/google/callback/addUser', googleCallbackAddUser, addUser);

module.exports = router;
