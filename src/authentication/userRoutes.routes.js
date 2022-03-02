const router = require('express').Router();
const authController = require('./auth.controller');
router.get('/getAll',  authController.getAllUsers );
router.post('/addUser', authController.addUser );
module.exports = router ;