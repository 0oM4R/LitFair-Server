const router = require('express').Router();
const {isCompany} = require('../../middleware/authZ');

const {
  getJobs,
  getJob,
  addJob,
  updateJob,
  deleteJob
} = require('./job.controller');
const { getApps, submitApp, deleteApp } = require('./application.controller');

route.get('/jobs', getJobs);
route.get('/job/:id', getJob);
route.post('/job', addJob);
route.put('/job/:id', updateJob);
route.delete('/job/:id', deleteJob);

router.get('/applications', getApps);
router.post('/application/:job_id', submitApp);
router.delete('/application/:app_id', deleteApp);

module.exports = route;