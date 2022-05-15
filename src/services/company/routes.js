const router = require('express').Router();
const { isCompany } = require('../../middleware/authZ');

const {
  getCompaniesFull,
  getCompanyFull,
  addCompanyFull,
  updateCompanyFull,
  deleteCompanyFull
} = require('./controller');

router.get('/companies', getCompaniesFull);
router.get('/company/:id', getCompanyFull);
router.post('/company', isCompany, addCompanyFull);
router.put('/company/:id', isCompany, updateCompanyFull);
router.delete('/company/:id', isCompany, deleteCompanyFull);

module.exports = router;
