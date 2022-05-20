const router = require("express").Router();
const auth = require('../../middleware/passport');
const role = require('../../middleware/Role');
const controller = require('./controller-seeker');
const uploadFile = require('../../config/multer');

router.get("/seeker/profile/info",auth.jwtStrategy,role.isSeeker,controller.userProfile);
router.put("/seeker/profile/update",auth.jwtStrategy,role.isSeeker,controller.updateUserProfile);
router.post("/seeker/profile/create",auth.jwtStrategy,role.isSeeker,controller.createSeekerProfile);
router.put("/seeker/details/update",auth.jwtStrategy,role.isSeeker,controller.updateSeekerDetails);
router.get("/seeker/details/view",auth.jwtStrategy,role.isSeeker,controller.getSeekerDetails);
router.post("/seeker/details/CV",auth.jwtStrategy,role.isSeeker,uploadFile.upload.single("cv"),controller.upload_CV)
module.exports = {SeekerRoutes:router};