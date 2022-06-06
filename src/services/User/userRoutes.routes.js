const router = require('express').Router();
const { jwtStrategy, googleCallback, googleCallbackAddUser, googleAuthenticateAddUser } = require('../../middleware/passport');
const { login } = require('../../middleware/googleOauth');
const { getAllUsers, addUser, login, logout, refreshJWT, googleLogin } = require('../User/controller-User');
const { createSeekerProfile } = require('../seeker/controller-seeker');

router.get('/getAll', jwtStrategy, getAllUsers);
router.post('/addUser', addUser, createSeekerProfile);
router.post('/login', login);
router.delete('/logout', logout);

router.get('/jwtValidate', jwtStrategy, refreshJWT);

router.post('/auth/google', login, googleLogin);
router.get('/google/callback', googleCallback, googleLogin);

router.get('/google/addUser', googleAuthenticateAddUser);
router.get('/google/callback/addUser', googleCallbackAddUser, addUser);

module.exports = router;
