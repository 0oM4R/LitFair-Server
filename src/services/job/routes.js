const router = require('express').Router();
// const {isCompany} = require('../../middleware/authZ');

const {
  getJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob
} = require('./job.controller');
const { getApps, submitApp, deleteApp } = require('./application.controller');
const { jwtStrategy } = require('../../middleware/passport');
const { isCompany, isSeeker } = require('../../middleware/Role');

router.get('/jobs', getJobs);
router.get('/job/:id', getJob);
router.post('/job', isCompany, addJob);
router.put('/job/:id', isCompany, updateJob);
router.delete('/job/:id', isCompany, deleteJob);

router.get('/applications', jwtStrategy, getApps);
router.post('/application/:job_id', submitApp);
router.delete('/application/:app_id', deleteApp);

module.exports = router;
