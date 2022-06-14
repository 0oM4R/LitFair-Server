const router = require('express').Router();
const { isCompany } = require('../../middleware/authZ');
const { jwtStrategy } = require('../../middleware/passport');

const { getCompaniesFull, getCompanyFull, addCompanyFull, updateCompanyFull, deleteCompanyFull, updateCompanyProfile } = require('./controller');

// Public
router.get('/companies', getCompaniesFull);
router.get('/companies/:id', getCompanyFull);

// Like an admin
router.post('/companies', jwtStrategy, isCompany, addCompanyFull);
router.put('/companies/:id', jwtStrategy, isCompany, updateCompanyFull);
router.delete('/companies/:id', jwtStrategy, isCompany, deleteCompanyFull);

router.put('/companies/profile', jwtStrategy, isCompany, updateCompanyProfile);

module.exports = router;
