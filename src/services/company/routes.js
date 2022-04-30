const router = require('express').Router();
const {isCompany} = require('../../middleware/authZ');


const {
  getCompaniesFull,
  getCompanyFull,
  addCompanyFull,
  updateCompanyFull,
  deleteCompanyFull
} = require('./controller');

router.get('/companies', getCompaniesFull);
router.get('/company/:username', getCompanyFull);
router.post('/company', isCompany, addCompanyFull);
router.put('/profile', isCompany, updateCompanyFull);
router.delete('/profile', isCompany, deleteCompanyFull);

module.exports = router;
