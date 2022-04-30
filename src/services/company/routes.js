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
router.get('/company/:username', getCompanyFull);   //company/:username
router.post('/company/:username', isCompany, addCompanyFull);
router.put('/company/:username', isCompany, updateCompanyFull);
router.delete('/company/:username', isCompany, deleteCompanyFull);

module.exports = router;
