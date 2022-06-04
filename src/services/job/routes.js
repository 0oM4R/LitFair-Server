const router = require('express').Router();
const { jwtStrategy } = require('../../middleware/passport');
const { videoUpload } = require('../../config/multer');

const {
  getJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob,
  upload_video,
  sendMsg
} = require('./job.controller');
const { getApps, submitApp, deleteApp } = require('./application.controller');
const { isCompany } = require('../../middleware/Role');

router.get('/jobs', getJobs);
router.get('/job/:id', getJob);
router.post('/job', jwtStrategy, isCompany, addJob);
router.put('/job/:id', jwtStrategy, isCompany, updateJob);
router.delete('/job/:id', jwtStrategy, isCompany, deleteJob);
router.post('/upload_video', videoUpload.single('video'), upload_video);

router.get('/applications', jwtStrategy, getApps);
router.post('/application/:job_id', jwtStrategy, submitApp);
router.delete('/application/:app_id', jwtStrategy, deleteApp);

router.post('/sendMsg', sendMsg);
module.exports = router;
