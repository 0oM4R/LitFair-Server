const jobCategoriesModel = require('./model-jobCategories').jobCategoriesModel;
const disconnect = require('./model-jobCategories').disconnect;
const mongoose = require('mongoose');
const connection = require('../../../DB/MongDB.config');

const getAll = async (req, res) => {
  const result = await jobCategoriesModel.find({});
  res.json(result);
};
const search = async (req, res) => {
  const jobCategory = req.query.jobCategory ? req.query.jobCategory : '';
  const regSkill = new RegExp(`^${jobCategory}|. ${jobCategory}`, 'i');
  const result = await jobCategoriesModel
    .find({ jobCategories: { $regex: regSkill } })
    .limit(50)
    .sort();
  res.json(result);
};
const newJobCategory = async (req, res) => {
  const jobCategory = new jobCategoriesModel({
    'Skills Keys': req.params.jobCategoryName
  });
  await jobCategory.save();
  res.send(jobCategory);
};
module.exports = { getAll, search, newJobCategory };
