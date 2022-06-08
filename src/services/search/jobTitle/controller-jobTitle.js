const jobTitleModel = require('./model-jobTitle');

const getAll = async (req, res) => {
    const result = await jobTitleModel.find({});
    res.json(result);
};
const search = async (req, res) => {
    const jobTitle = req.query.jobTitle ? req.query.jobTitle : '';
    const regSkill = new RegExp(`^${jobTitle}|. ${jobTitle}`, 'i');
    const result = await jobTitleModel
        .find({ 'job title': { $regex: regSkill } })
        .limit(50)
        .sort();
    res.json(result);
};
const newJobTitle = async (req, res) => {
    const jobTitle = new jobTitleModel({
        'Skills Keys': req.params.jobTitleName
    });
    await jobTitle.save();
    res.send(jobTitle);
};
module.exports = { getAll, search, newJobTitle };
