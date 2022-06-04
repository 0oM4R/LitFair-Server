const { skillsModel, disconnect } = require('./model-skills');

const getAll = async (req, res) => {
  const result = await skillsModel.find({});

  res.json(result);
};
const search = async (req, res) => {
  const skill = req.query.skill ? req.query.skill : '';
  const regSkill = new RegExp(`^${skill}|. ${skill}`, 'i');
  const result = await skillsModel
    .find({ skill: { $regex: regSkill } })
    .limit(50)
    .sort();

  res.json(result);
};
const newSkill = async (req, res) => {
  const skill = new skillsModel({ 'Skills Keys': req.params.skillName });
  await skill.save();
  res.send(skill);
};
module.exports = { getAll, search, newSkill };
