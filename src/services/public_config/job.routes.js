const router = require('express').Router();
const { successfulRes } = require('../../utils/response');

const { jobType, experienceType } = require('../job/model');

router.get('/job-config', (req, res) => {
  successfulRes(res, 200, {
    job_type: jobType,
    experience_type: experienceType
  });
});

module.exports = router;
