const router = require('express').Router();
const { jwtStrategy } = require('../../middleware/passport');

const {
  getJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob
} = require('./job.controller');
const { getApps, submitApp, deleteApp } = require('./application.controller');
const { isCompany } = require('../../middleware/Role');


router.get('/jobs', getJobs);
router.get('/job/:id', getJob);
router.post('/job', jwtStrategy, isCompany, addJob);
router.put('/job/:id', jwtStrategy, isCompany, updateJob);
router.delete('/job/:id', jwtStrategy, isCompany, deleteJob);

router.get('/applications', jwtStrategy, getApps);
router.post('/application/:job_id', jwtStrategy, submitApp);
router.delete('/application/:app_id', jwtStrategy, deleteApp);

module.exports = router;
