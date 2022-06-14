const router = require('express').Router();
const { jwtStrategy } = require('../../middleware/passport');
const { isSeeker } = require('../../middleware/authZ');
const {
    userProfile,
    updateUserProfile,
    createSeekerProfile,
    updateSeekerDetails,
    getSeekerDetails,
    upload_CV,
    delete_CV
} = require('./controller-seeker');
const { upload } = require('../../config/multer');

// seeker profile
router.get('/seeker/profile/info', jwtStrategy, isSeeker, userProfile);
router.post('/seeker/profile/create', jwtStrategy, isSeeker, createSeekerProfile);
router.put('/seeker/profile/update', jwtStrategy, isSeeker, updateUserProfile);

// seeker details
router.get('/seeker/details/view/:id', getSeekerDetails);
router.put('/seeker/details/update', jwtStrategy, isSeeker, updateSeekerDetails);
router.post('/seeker/details/CV', jwtStrategy, isSeeker, upload.single('cv'), upload_CV);
router.delete('/seeker/details/cv/delete', jwtStrategy, isSeeker, delete_CV);

module.exports = router;
