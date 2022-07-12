const router = require('express').Router();
const { isCompany } = require('../../middleware/authZ');
const { jwtStrategy } = require('../../middleware/passport');

const { getCompaniesFull, getCompanyFull, updateCompanyFull, deleteCompanyFull, getApplications, getPostedJobs } = require('./controller');

// Public
router.get('/companies', getCompaniesFull);
router.get('/companies/profile/:id', getCompanyFull);

// Like an admin
router.get('/companies/jobs', jwtStrategy, isCompany, getPostedJobs);
router.get('/companies/jobs/:job_id', jwtStrategy, isCompany, getApplications);
router.put('/companies/profile', jwtStrategy, isCompany, updateCompanyFull);
router.delete('/companies/profile', jwtStrategy, isCompany, deleteCompanyFull);

module.exports = router;
