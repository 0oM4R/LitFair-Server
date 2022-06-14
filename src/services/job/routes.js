const router = require('express').Router();
const { jwtStrategy } = require('../../middleware/passport');
const { videoUpload } = require('../../config/multer');
const { isCompany } = require('../../middleware/authZ');

const { getJobs, getJob, addJob, updateJob, deleteJob } = require('./job.controller');
const { getApps, submitApp, deleteApp, getApp, upload_video, submitVideo } = require('./application.controller');

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
router.post('/upload_video', jwtStrategy, videoUpload.single('video'), upload_video);

router.post('/sendMsg', submitVideo);

module.exports = router;
