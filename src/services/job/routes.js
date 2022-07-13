const router = require('express').Router();
const { jwtStrategy } = require('../../middleware/passport');
const { videoUpload } = require('../../config/multer');
const { isCompany } = require('../../middleware/authZ');

const { getJobs, getJob, addJob, updateJob, deleteJob } = require('./job.controller');
const { getApps, submitApp, deleteApp, getApp, submitVideo, submitFeedback, feedbackMocking, feedbackEmail } = require('./application.controller');

//job routes
router.get('/jobs', getJobs);
router.get('/jobs/:id', jwtStrategy, getJob);
router.post('/jobs', jwtStrategy, isCompany, addJob);
router.put('/jobs/:id', jwtStrategy, isCompany, updateJob);
router.delete('/jobs/:id', jwtStrategy, isCompany, deleteJob);

//application routes
router.get('/applications', jwtStrategy, getApps);
router.get('/applications/:id', jwtStrategy, getApp);
router.post('/applications/:job_id', jwtStrategy, submitApp);
router.delete('/applications/:app_id', jwtStrategy, deleteApp);

router.post('/feedback-mocking/:app_id', feedbackMocking);
router.post('/feedback-email/:job_id', jwtStrategy, isCompany, feedbackEmail);
router.post('/submit-feedback/:app_id', isCompany, submitFeedback);
router.post('/submit-video/:app_id', jwtStrategy, videoUpload.single('video'), submitVideo);

module.exports = router;
