const router = require('express').Router();
const { isCompany } = require('../../middleware/authZ');
const { jwtStrategy } = require('../../middleware/passport');

const { getCompaniesFull, getCompanyFull, addCompanyFull, updateCompanyFull, deleteCompanyFull, updateCompanyProfile } = require('./controller');

// Like an admin
router.get('/companies', getCompaniesFull);
router.get('/companies/:id', getCompanyFull);
router.post('/companies', jwtStrategy, isCompany, addCompanyFull);
router.put('/companies/:id', jwtStrategy, isCompany, updateCompanyFull);
router.delete('/companies/:id', jwtStrategy, isCompany, deleteCompanyFull);

router.put('/profile/companies', jwtStrategy, isCompany, updateCompanyProfile);
// router.delete('/companies/:id', jwtStrategy, isCompany, deleteCompanyFull);

module.exports = router;
