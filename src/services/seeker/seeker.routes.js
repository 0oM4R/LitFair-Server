const router = require('express').Router();
const { jwtStrategy } = require('../../middleware/passport');
const { isSeeker } = require('../../middleware/authZ');
const {
    userProfile,
    updateUserProfile,
    updateSeekerDetails,
    getSeekerDetails,
    upload_CV,
    delete_CV
} = require('./controller-seeker');
const { upload } = require('../../config/multer');

// seeker profile
router.get('/seeker/profile/info', jwtStrategy, isSeeker, userProfile);
router.put('/seeker/profile/update', jwtStrategy, isSeeker, updateUserProfile);
// router.post('/seeker/profile/create', jwtStrategy, isSeeker, createSeekerProfile);

// seeker details
router.get('/seeker/details/view/:id', getSeekerDetails);
router.put('/seeker/details/update', jwtStrategy, isSeeker, updateSeekerDetails);
router.post('/seeker/details/CV', jwtStrategy, isSeeker, upload.single('cv'), upload_CV);
router.delete('/seeker/details/cv/delete', jwtStrategy, isSeeker, delete_CV);

module.exports = router;
