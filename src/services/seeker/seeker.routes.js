const router = require("express").Router();
const auth = require('../../middleware/passport');
const role = require('../../middleware/Role');
const controller = require('./controller-seeker')
router.get("/seeker/profile",auth.jwtStrategy,role.isSeeker,controller.userProfile);
router.put("/seeker/Update",auth.jwtStrategy,role.isSeeker,controller.updateUserProfile);
router.post("/seeker/create",controller.createSeekerProfile)

module.exports = {SeekerRoutes:router}