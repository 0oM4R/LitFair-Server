const router = require('express').Router();
const { isCompany } = require('../../middleware/authZ');
const { jwtStrategy } = require('../../middleware/passport');

const { getCompaniesFull, getCompanyFull, addCompanyFull, updateCompanyFull, deleteCompanyFull } = require('./controller');

// Public
router.get('/companies', getCompaniesFull);
router.get('/companies/:id', getCompanyFull);

// Like an admin
router.post('/companies', jwtStrategy, isCompany, addCompanyFull);
router.put('/companies', jwtStrategy, isCompany, updateCompanyFull);
router.delete('/companies', jwtStrategy, isCompany, deleteCompanyFull);

module.exports = router;
